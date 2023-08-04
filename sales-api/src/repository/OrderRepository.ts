import Order, { IOrder } from "../entity/Order";

export interface IOrderRepository {
  findAll(): Promise<IOrder[]>;
  save(order: IOrder): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
  update(order: IOrder): Promise<void>;
}

const OrderRepository = (): IOrderRepository => {
  const findAll = async (): Promise<IOrder[]> => {
    return Order.find();
  };

  const findById = async (id: string): Promise<IOrder | null> => {
    return Order.findById(id);
  };

  const save = async (order: IOrder): Promise<IOrder> => {
    return Order.create(order);
  };

  const update = async (order: IOrder): Promise<void> => {
    Order.updateOne(order);
  };

  return { findAll, findById, save, update };
};

export default OrderRepository();
