import { NextFunction, Request, Response } from "express";
import { OrderService } from "../service";
import { OrderException } from "../exception";
import { User } from "../types/user";
import { Product } from "../types/product";
import HttpStatusCode from "../enum/HttpStatusCode";
import logger from "../utils/logger";

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await OrderService.findAll();

    const response = { orders };
    logger(req, response);
    return res.status(HttpStatusCode.OK).json(response);
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

    const response = { order };
    logger(req, response);
    return res.status(HttpStatusCode.OK).json(response);
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

    const response = { sales_ids: order.map((order) => order._id) };
    logger(req, response);
    return res.status(HttpStatusCode.OK).json(response);
  } catch (error: unknown) {
    return next(error);
  }
};

const save = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    const { authorization } = req.headers;
    const { products } = req.body;

    const order = await OrderService.save(products as Product[], user as User, {
      authorization: authorization as string,
      X_TRANSACTION_ID: req.headers["x-transaction-id"] as string
    });

    const response = { order };
    logger(req, response);
    return res.status(HttpStatusCode.CREATED).json(response);
  } catch (error: unknown) {
    return next(error);
  }
};

export default { findAll, findById, findByProductId, save };
