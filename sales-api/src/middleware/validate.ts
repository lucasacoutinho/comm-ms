import { NextFunction, Request, Response } from "express";
import tryCatchFn from "src/utils/functions";
import { AnyZodObject } from "zod";

const validate = tryCatchFn(
  (schema: AnyZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    return next();
  }
);

export default validate;
