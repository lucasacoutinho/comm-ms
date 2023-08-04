import mongoose from "mongoose";
import { env } from "./env";
import Order from "../entity/Order";

const connectMongoDB = () => {
  mongoose.connect(env.DB_CONN);

  mongoose.connection.on("connected", () => {
    console.info("⚡️[mongodb]: Connected to database");
  });

  mongoose.connection.on("error", (err) => {
    console.info("⚡️[mongodb]: Database error: " + err);
  });
};

const initialize = async () => {
  await Order.collection.drop();

  await Order.create({
    products: [
      { product_id: 1001, quantity: 5 },
      { product_id: 1002, quantity: 2 },
      { product_id: 1003, quantity: 2 }
    ],
    user: {
      id: 1
    },
    status: "APPROVED"
  });

  await Order.create({
    products: [
      { product_id: 1001, quantity: 2 },
      { product_id: 1002, quantity: 1 },
      { product_id: 1003, quantity: 1 }
    ],
    user: {
      id: 1
    },
    status: "REJECTED"
  });
};

export default { connectMongoDB, initialize };
