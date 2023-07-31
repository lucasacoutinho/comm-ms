import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { env } from "./config/env";
import router from "./routes";
import HttpStatusCode from "./enum/HttpStatusCode";
import AppException from "./exception/AppException";

const app: Express = express();
const port = env.PORT;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", router);

app.use((err: AppException, _req: Request, res: Response) => {
  err.status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;

  res.status(err.status).json({
    message: err.message,
    stack: env.NODE_ENV === "development" ? err.stack : undefined
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
