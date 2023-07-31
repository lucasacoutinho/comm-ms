import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().min(1),
    API_SECRET: z.string().min(1),
    PORT: z.coerce.number().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().min(1),
    DB_USER: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_DATABASE: z.string().min(1),
    RABBIT_MQ_HOST: z.string().min(1),
    RABBIT_MQ_PORT: z.coerce.number().min(1),
    RABBIT_MQ_USERNAME: z.string().min(1),
    RABBIT_MQ_PASSWORD: z.string().min(1),
    SALES_PRODUCT_HOST: z.string().min(1),
    SALES_PRODUCT_PORT: z.coerce.number().min(1)
  },
  runtimeEnv: process.env
});
