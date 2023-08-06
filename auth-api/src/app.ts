import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ZodError } from "zod";
import { env } from "./config/env";
import { AppDataSource } from "./config/database";
import router from "./routes";
import { AppException } from "./exception";
import HttpStatusCode from "./enum/HttpStatusCode";
import logger from "./utils/logger";

AppDataSource.initialize().then(() => {
  const app: Express = express();
  const port = env.PORT;

  app.use(express.json());
  app.use(cors());
  app.use(express.static("public"));

  app.use("/api", router);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const local = env.NODE_ENV === "development";

    let status = HttpStatusCode.INTERNAL_SERVER_ERROR;
    let message: unknown =
      local || err instanceof AppException ? err.message : "Whoops! Something went wrong! Please try again later.";
    const stack = local ? err.stack : undefined;

    if (err instanceof ZodError) {
      const errors: { [key: string]: string[] } = {};
      err.issues.forEach((issue) => {
        const field = issue.path.join(".");
        const error = issue.message;
        if (errors[field]) {
          errors[field]?.push(error);
        } else {
          errors[field] = [error];
        }
      });
      message = errors;
      status = HttpStatusCode.UNPROCESSABLE_ENTITY;
    }

    if (err instanceof AppException) {
      status = err.status;
    }

    logger(_req, message);

    return res.status(status).json({
      message: message,
      stack: stack
    });
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
});
