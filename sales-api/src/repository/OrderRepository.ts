import Order, { IOrder } from "../entity/Order";

const findAll = async (): Promise<IOrder[]> => {
  return Order.find();
};

const findById = async (id: string): Promise<IOrder | null> => {
  return Order.findById(id);
};

const findByProductId = async (id: number): Promise<IOrder[]> => {
  return Order.find({ products: { $elemMatch: { product_id: id } } });
};

const save = async (order: IOrder): Promise<IOrder> => {
  return Order.create(order);
};

const update = async (order: IOrder): Promise<void> => {
  Order.updateOne(order);
};

export default { findAll, findById, findByProductId, save, update };
