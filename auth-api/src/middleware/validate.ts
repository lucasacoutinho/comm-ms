import HttpStatusCode from "../enum/HttpStatusCode";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).json({ message: error.issues });
    }
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

export default validate;
