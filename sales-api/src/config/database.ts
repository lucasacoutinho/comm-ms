import { DataSource } from "typeorm";
import { env } from "./env";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/../entity/**{.js,.ts}"],
  migrations: [__dirname + "/../migration/**{.js,.ts}"]
});
