import mongoose from "mongoose";
import { Product } from "../types/product";
import { User } from "../types/user";

export interface IOrder {
  _id?: string;
  products?: Array<Product>;
  user: User;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new mongoose.Schema<IOrder>({
  products: {
    type: Array<Product>,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model<IOrder>("Order", OrderSchema);
