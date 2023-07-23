import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    API_SECRET: z.string().min(1),
    PORT: z.coerce.number().min(1),
    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().min(1),
    DB_USER: z.string().min(1),
    DB_PASS: z.string().min(1),
    DB_DATABASE: z.string().min(1)
  },
  runtimeEnv: process.env
});
