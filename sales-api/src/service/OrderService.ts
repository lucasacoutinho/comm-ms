import { ObjectId } from "typeorm";
import { Order } from "../entity/Order";
import { IOrderRepository } from "../repository/OrderRepository";
import OrderException from "../exception/OrderException";
import HttpStatusCode from "src/enum/HttpStatusCode";

export interface IOrderService {
    findAll(): Promise<Order[]>;
    create(data: Order): Promise<Order>;
    findById(id: ObjectId): Promise<Order | null>;
}

export class OrderService implements IOrderService {
    constructor(private _repo: IOrderRepository<Order>) { }

    async findAll(): Promise<Order[]> {
        return await this._repo.findAll();
    }

    async create(data: Order): Promise<Order> {
        return await this._repo.create(data);
    }

    async findById(id: ObjectId): Promise<Order | null> {
        const order = await this._repo.findById(id);
        if (!order) {
            throw new OrderException("Order not found", HttpStatusCode.BAD_REQUEST);
        }
        return order;
    }
}
