import mongoose from "mongoose";
import { env } from "./env";
import Order from "../entity/Order";

const connectMongoDB = () => {
  mongoose.connect(env.DB_CONN);

  mongoose.connection.on("connected", () => {
    console.log("⚡️[mongodb]: Connected to database");
  });

  mongoose.connection.on("error", (err) => {
    console.log("⚡️[mongodb]: Database error: " + err);
  });
};

const initialize = async () => {
  await Order.collection.drop();

  await Order.create({
    products: [
      { productId: 1001, quantity: 5 },
      { productId: 1002, quantity: 2 },
      { productId: 1003, quantity: 2 }
    ],
    user: {
      id: 1
    },
    status: "APPROVED"
  });

  await Order.create({
    products: [
      { productId: 1001, quantity: 2 },
      { productId: 1002, quantity: 1 },
      { productId: 1003, quantity: 1 }
    ],
    user: {
      id: 1
    },
    status: "REJECTED"
  });
};

export default { connectMongoDB, initialize };
