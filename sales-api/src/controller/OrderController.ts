import { NextFunction, Request, Response } from "express";
import OrderService, { IOrderService } from "../service/OrderService";
import OrderException from "../exception/OrderException";
import HttpStatusCode from "../enum/HttpStatusCode";
import { User } from "../types/user";
import { Product } from "../types/product";

type FindByIdRequest = Request<{ id: string }>;
type SaveRequest = Request<object, object, { products: Product[] }>;

const OrderController = (OrderService: IOrderService) => {
  const findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await OrderService.findAll();
      return res.status(HttpStatusCode.OK).json({ data: orders });
    } catch (error: unknown) {
      return next(error);
    }
  };

  const findById = async (req: FindByIdRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const order = await OrderService.findById(id);
      if (!order) {
        return next(new OrderException("Order not found", HttpStatusCode.NOT_FOUND));
      }

      return res.status(HttpStatusCode.OK).json({ data: order });
    } catch (error: unknown) {
      return next(error);
    }
  };

  const save = async (req: SaveRequest, res: Response, next: NextFunction) => {
    try {
      const { user } = req;
      const { authorization } = req.headers;
      const { products } = req.body;

      const order = await OrderService.save(products as Product[], user as User, authorization as string);

      return res.status(HttpStatusCode.CREATED).json({ data: order });
    } catch (error: unknown) {
      return next(error);
    }
  };

  return { findAll, findById, save };
};

export default OrderController(OrderService);
