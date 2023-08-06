import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TraceException } from "../exception";
import HttpStatusCode from "../enum/HttpStatusCode";

const trace = async (req: Request, _res: Response, next: NextFunction) => {
  const {
    headers: { "x-transaction-id": X_TRANSACTION_ID }
  } = req;

  if (!X_TRANSACTION_ID) {
    next(new TraceException("The x-transaction-id header is required", HttpStatusCode.BAD_REQUEST));
  }

  req.headers["x-service-id"] = uuidv4();

  next();
};

export default trace;
