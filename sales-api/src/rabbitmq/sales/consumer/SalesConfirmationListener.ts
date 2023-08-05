import amqp, { Channel, Connection, Message } from "amqplib/callback_api";
import { CONNECT_URL } from "../../../config/amqp";
import { env } from "../../../config/env";
import OrderService from "../../../service/OrderService";
import OrderStatus from "../../../enum/OrderStatus";

type SaleConfirmationDTO = {
  sales_id: string;
  status: OrderStatus;
};

const listen = () => {
  amqp.connect(CONNECT_URL, (err: unknown, conn: Connection) => {
    if (err) {
      throw err;
    }

    console.info("[*] Waiting for messages in [%s]. To exit press CTRL+C", env.RABBIT_MQ_SALES_CONFIRMATION_QUEUE);

    conn.createChannel((err: unknown, channel: Channel) => {
      if (err) {
        throw err;
      }

      channel.consume(
        env.RABBIT_MQ_SALES_CONFIRMATION_QUEUE,
        (msg: Message | null) => {
          if (!msg) {
            return;
          }
          console.info(" [x] Received %s", msg.content.toString());

          try {
            const order = JSON.parse(msg.content.toString()) as SaleConfirmationDTO;
            if (order.sales_id && order.status) {
              OrderService.updateStatus(order.sales_id, order.status);
            } else {
              console.warn(" [x] Invalid message");
            }
          } catch (error) {
            console.warn(" [x] Could not parse message from queue", error);
          }

          console.info(" [x] Done");
        },
        { noAck: true }
      );
    });
  });
};

export default { listen };
