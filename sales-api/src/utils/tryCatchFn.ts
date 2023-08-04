import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/ban-types
const tryCatchFn = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default tryCatchFn;
