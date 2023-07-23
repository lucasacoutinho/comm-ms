import express, { Request, Response, Router } from "express";
import userRouter from "./userRouter";

const router: Router = express.Router();

router.get("/health-check", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

router.use(userRouter);

export default router;
