import amqp, { Channel, Connection } from "amqplib/callback_api";
import { CONNECT_URL } from "../../../config/amqp";
import { env } from "../../../config/env";
import { Product } from "../../../types/product";

type ProductStockDTO = {
  sales_id: string;
  products: Product[];
};

const send = (content: ProductStockDTO) => {
  amqp.connect(CONNECT_URL, (err: unknown, conn: Connection) => {
    if (err) {
      throw err;
    }

    const message = JSON.stringify(content);

    console.info(
      "[*] Publishing message to [%s] exchange with routing key [%s]: %s",
      env.RABBIT_MQ_PRODUCT_TOPIC,
      env.RABBIT_MQ_SALES_CONFIRMATION_ROUTING_KEY,
      message
    );

    conn.createChannel((err: unknown, channel: Channel) => {
      if (err) {
        throw err;
      }

      channel.publish(env.RABBIT_MQ_PRODUCT_TOPIC, env.RABBIT_MQ_STOCK_UPDATE_ROUTING_KEY, Buffer.from(message));
      console.info("[*] Message sent");
    });
  });
};

export default { send };
