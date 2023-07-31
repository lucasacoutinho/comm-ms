import { ObjectId, Repository } from "typeorm";
import { Order } from "../entity/Order";

export interface IOrderRepository<Order> {
    findAll(): Promise<Order[]>;
    findById(id: ObjectId): Promise<Order | null>;
    create(data: Order): Promise<Order>;
    update(id: ObjectId, data: Order): Promise<Order | null>;
    delete(id: ObjectId): Promise<boolean>;
};

export class OrderRepository implements IOrderRepository<Order> {
    private readonly _model: Repository<Order>;

    constructor(model: Repository<Order>) {
        this._model = model;
    }

    async findAll(): Promise<Order[]> {
        return await this._model.find();
    }

    async findById(id: ObjectId): Promise<Order | null> {
        return await this._model.findOne({ where: { id: id } });
    }

    async create(data: Order): Promise<Order> {
        return await this._model.save(data);
    }

    async update(id: ObjectId, data: Order): Promise<Order | null> {
        await this._model.update(id, data);
        return this.findById(id);
    }

    async delete(id: ObjectId): Promise<boolean> {
        const result = await this._model.delete(id);
        return result.affected === 1;
    }
}
