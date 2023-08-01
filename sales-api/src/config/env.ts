import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    API_SECRET: z.string().min(1),
    PORT: z.coerce.number().min(1),
    DB_CONN: z.string().min(1),
    RABBIT_MQ_HOST: z.string().min(1),
    RABBIT_MQ_PORT: z.coerce.number().min(1),
    RABBIT_MQ_USERNAME: z.string().min(1),
    RABBIT_MQ_PASSWORD: z.string().min(1),
    RABBIT_MQ_PRODUCT_TOPIC: z.string().min(1),
    RABBIT_MQ_STOCK_UPDATE_QUEUE: z.string().min(1),
    RABBIT_MQ_STOCK_UPDATE_ROUTING_KEY: z.string().min(1),
    RABBIT_MQ_SALES_CONFIRMATION_QUEUE: z.string().min(1),
    RABBIT_MQ_SALES_CONFIRMATION_ROUTING_KEY: z.string().min(1),
    SALES_PRODUCT_HOST: z.string().min(1),
    SALES_PRODUCT_PORT: z.coerce.number().min(1)
  },
  runtimeEnv: process.env
});
