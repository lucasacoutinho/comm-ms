import { Request } from "express";

const logger = (req: Request, res: unknown) => {
  const {
    headers: { "x-transaction-id": X_TRANSACTION_ID, "x-service-id": X_SERVICE_ID }
  } = req;

  switch (req.method) {
    case "GET":
      console.info(
        `[${X_TRANSACTION_ID}][${X_SERVICE_ID}] ${req.method} ${req.originalUrl} ${JSON.stringify(req.query)}`
      );
      break;

    case "POST":
      console.info(
        `[${X_TRANSACTION_ID}][${X_SERVICE_ID}] ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`
      );
      break;

    default:
      break;
  }

  console.info(`[${X_TRANSACTION_ID}][${X_SERVICE_ID}] ${req.method} ${req.originalUrl} ${JSON.stringify(res)}`);
};

export default logger;
