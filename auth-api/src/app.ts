import { AppDataSource } from "./config/database";
import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import { env } from "./config/env";

AppDataSource.initialize().then(() => {
  const app: Express = express();
  const port = env.PORT;

  app.use(express.json());
  app.use(morgan("tiny"));
  app.use(cors());
  app.use(express.static("public"));

  app.use("/api", router);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
