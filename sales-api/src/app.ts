import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { env } from "./config/env";
import router from "./routes";
import HttpStatusCode from "./enum/HttpStatusCode";
import AppException from "./exception/AppException";
import database from "./config/database";
import amqp from "./config/amqp";
import { ZodError } from "zod";

database.connectMongoDB();
// database.initialize();
amqp.connectRabbitMq();

const app: Express = express();
const port = env.PORT;

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

app.use("/api", router);

app.use("*", (req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    message: `Can't find ${req.originalUrl} this route`
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const local = env.NODE_ENV === "development";

  if (err instanceof ZodError) {
    return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({
      errors: err.issues
    });
  }

  if (err instanceof AppException) {
    err.status = err.status || HttpStatusCode.INTERNAL_SERVER_ERROR;

    return res.status(err.status).json({
      message: err.message,
      stack: local ? err.stack : undefined
    });
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: local ? err.message : "Whoops! Something went wrong! Please try again later.",
    stack: local ? err.stack : undefined
  });
});

app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
