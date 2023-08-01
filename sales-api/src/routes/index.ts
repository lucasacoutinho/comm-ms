import express, { Request, Response, Router } from "express";
import orderRouter from "./orderRouter";

const router: Router = express.Router();

router.get("/health-check", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

router.use("/order", orderRouter);

export default router;
