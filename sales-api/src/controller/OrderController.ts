import { NextFunction, Request, Response } from "express";
import { OrderService } from "../service/OrderService";
import { ObjectId } from "typeorm";
import HttpStatusCode from "../enum/HttpStatusCode";
import { User } from "../entity/User";

export class OrderController {
    constructor(private _service: OrderService) { }

    public async findAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await this._service.findAll();
            return res.status(HttpStatusCode.OK).json({ data: orders });
        } catch (error) {
            return next(error);
        }
    }

    public async findById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const order = await this._service.findById(new ObjectId(id));
            return res.status(HttpStatusCode.OK).json({ data: order });
        } catch (error) {
            return next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = new User();
            user.id = req.auth as number;

            const order = await this._service.create(req.body);
            return res.status(HttpStatusCode.CREATED).json({ data: order });
        } catch (error) {
            return next(error);
        }
    }
}
