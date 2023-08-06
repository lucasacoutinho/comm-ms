import { OrderRepository } from "../repository";
import ProductStockSender from "../rabbitmq/product/producer/ProductStockSender";
import ProductClient from "../client/product/ProductClient";
import { OrderException } from "../exception";
import { IOrder } from "../entity/Order";
import OrderStatus from "../enum/OrderStatus";
import { Product } from "../types/product";
import { User } from "../types/user";
import HttpStatusCode from "../enum/HttpStatusCode";

const findAll = async (): Promise<IOrder[]> => {
  return OrderRepository.findAll();
};

const findByProductId = async (id: number): Promise<IOrder[]> => {
  return OrderRepository.findByProductId(id);
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

const validateStock = async (products: Product[], productRequestHeaders: unknown): Promise<void> => {
  const stockIsOut = await ProductClient.checkProductStock(products, productRequestHeaders);

  if (stockIsOut) {
    throw new OrderException("The stock is out for the products", HttpStatusCode.UNPROCESSABLE_ENTITY);
  }
};

const save = async (products: Product[], user: User, productRequestHeaders: unknown): Promise<IOrder> => {
  validateProducts(products);

  const order = {
    user: user,
    products: products,
    status: OrderStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  await validateStock(order.products, productRequestHeaders);

  const result = await OrderRepository.save(order);

  ProductStockSender.send({
    sales_id: result._id as string,
    products: result.products as Product[]
  });

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

export default { findAll, findById, findByProductId, save, updateStatus };
