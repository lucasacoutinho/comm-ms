import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/health-check", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default router;
