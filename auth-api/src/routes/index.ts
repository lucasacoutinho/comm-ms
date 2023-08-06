import express, { Request, Response, Router } from "express";
import userRouter from "./userRouter";
import { trace } from "../middleware";

const router: Router = express.Router();

router.get("/health-check", (_req: Request, res: Response) => {
  res.json({ status: "OK" });
});

router.use(trace);
router.use("/user", userRouter);

export default router;
