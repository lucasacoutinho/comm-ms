import amqp, { Connection, Channel } from "amqplib/callback_api";
import { env } from "./env";

const connectRabbitMq = async () => {
  amqp.connect(
    `amqp://${env.RABBIT_MQ_USERNAME}:${env.RABBIT_MQ_PASSWORD}@${env.RABBIT_MQ_HOST}:${env.RABBIT_MQ_PORT}`,
    (err: unknown, conn: Connection) => {
      if (err) {
        throw err;
      }

      console.log("⚡️[rabbitmq]: Connected to rabbitmq");

      createQueue(
        conn,
        env.RABBIT_MQ_STOCK_UPDATE_QUEUE,
        env.RABBIT_MQ_STOCK_UPDATE_ROUTING_KEY,
        env.RABBIT_MQ_PRODUCT_TOPIC
      );

      createQueue(
        conn,
        env.RABBIT_MQ_SALES_CONFIRMATION_QUEUE,
        env.RABBIT_MQ_SALES_CONFIRMATION_ROUTING_KEY,
        env.RABBIT_MQ_PRODUCT_TOPIC
      );

      setTimeout(() => {
        conn.close();
      }, 500);
    }
  );
};

const createQueue = (connection: Connection, queue: string, routingKey: string, exchange: string) => {
  connection.createChannel((err: unknown, channel: Channel) => {
    if (err) {
      throw err;
    }

    channel.assertExchange(exchange, "topic", { durable: true });
    channel.assertQueue(queue, { durable: true });
    channel.bindQueue(queue, exchange, routingKey);
  });
};

export default { connectRabbitMq };
