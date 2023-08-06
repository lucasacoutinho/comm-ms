import express, { Request, Response, Router } from "express";
import orderRouter from "./orderRouter";
import { trace } from "../middleware";

const router: Router = express.Router();

router.get("/health-check", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

router.use(trace);
router.use("/order", orderRouter);

export default router;
