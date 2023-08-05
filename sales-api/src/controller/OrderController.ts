import { NextFunction, Request, Response } from "express";
import OrderService from "../service/OrderService";
import OrderException from "../exception/OrderException";
import HttpStatusCode from "../enum/HttpStatusCode";
import { User } from "../types/user";
import { Product } from "../types/product";

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.findAll();
    return res.status(HttpStatusCode.OK).json({ orders });
  } catch (error: unknown) {
    return next(error);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const order = await OrderService.findById(id as string);
    if (!order) {
      return next(new OrderException("Order not found", HttpStatusCode.NOT_FOUND));
    }

    return res.status(HttpStatusCode.OK).json({ order });
  } catch (error: unknown) {
    return next(error);
  }
};

const findByProductId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const order = await OrderService.findByProductId(Number(id));
    if (!order) {
      return next(new OrderException("Order not found", HttpStatusCode.NOT_FOUND));
    }

    return res.status(HttpStatusCode.OK).json({ sales_ids: order.map((order) => order._id) });
  } catch (error: unknown) {
    return next(error);
  }
};

const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const { authorization } = req.headers;
    const { products } = req.body;

    const order = await OrderService.save(products as Product[], user as User, authorization as string);

    return res.status(HttpStatusCode.CREATED).json({ order });
  } catch (error: unknown) {
    return next(error);
  }
};

export default { findAll, findById, findByProductId, save };
