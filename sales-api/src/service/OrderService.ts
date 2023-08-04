import OrderRepository, { IOrderRepository } from "../repository/OrderRepository";
import { IOrder } from "../entity/Order";
import OrderStatus from "../enum/OrderStatus";
import { Product } from "../types/product";
import StockChange, { IStockChange } from "../rabbitmq/product/producer/stockChange";
import { User } from "../types/user";
import OrderException from "../exception/OrderException";
import HttpStatusCode from "../enum/HttpStatusCode";
import ProductClient from "../client/product/ProductClient";

export interface IOrderService {
  findAll(): Promise<IOrder[]>;
  findById(id: string): Promise<IOrder | null>;
  save(products: Product[], user: User, token: string): Promise<IOrder>;
  updateStatus(id: string, status: OrderStatus): Promise<IOrder | void>;
}

const OrderService = (OrderRepository: IOrderRepository, stockChange: IStockChange): IOrderService => {
  const findAll = async (): Promise<IOrder[]> => {
    return OrderRepository.findAll();
  };

  const findById = async (id: string): Promise<IOrder | null> => {
    return OrderRepository.findById(id);
  };

  const validateProducts = (products: Product[]): void => {
    if (products.length === 0) {
      throw new OrderException("Order must have at least one product", HttpStatusCode.UNPROCESSABLE_ENTITY);
    }

    if (products.some((product) => !product.product_id)) {
      throw new OrderException("Product id must be informed", HttpStatusCode.UNPROCESSABLE_ENTITY);
    }

    if (products.some((product) => product.quantity <= 0)) {
      throw new OrderException("Product quantity must be greater than 0", HttpStatusCode.UNPROCESSABLE_ENTITY);
    }
  };

  const validateStock = async (products: Product[], token: string): Promise<void> => {
    const stockIsOut = await ProductClient.checkProductStock(products, token);

    if (stockIsOut) {
      throw new OrderException("The stock is out for the products", HttpStatusCode.UNPROCESSABLE_ENTITY);
    }
  };

  const save = async (products: Product[], user: User, token: string): Promise<IOrder> => {
    validateProducts(products);

    const order = {
      user: user,
      products: products,
      status: OrderStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await validateStock(order.products, token);

    const result = await OrderRepository.save(order);

    stockChange.send(result.products as Product[]);

    return result;
  };

  const updateStatus = async (id: string, status: OrderStatus): Promise<IOrder | void> => {
    const order = await OrderRepository.findById(id);

    if (!order) {
      return;
    }

    if (order.status && order.status === status) {
      return order;
    }

    order.status = status;

    return await OrderRepository.save(order);
  };

  return { findAll, findById, save, updateStatus };
};

export default OrderService(OrderRepository, StockChange);
