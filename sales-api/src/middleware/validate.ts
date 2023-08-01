import { NextFunction, Request, Response } from "express";
import HttpStatusCode from "../enum/HttpStatusCode";
import { AnyZodObject, ZodError } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    return next();
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({ message: error.message });
    }
  }
};

export default validate;
