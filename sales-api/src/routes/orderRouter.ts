import express, { Router } from "express";
import { authenticated, validate } from "../middleware";
import { OrderController } from "../controller";
import { OrderSchema } from "../schema";

const router: Router = express.Router();

router.use(authenticated);

router.get("/", OrderController.findAll);
router.get("/:id", validate(OrderSchema.FindByIdSchema), OrderController.findById);
router.post("/", validate(OrderSchema.SaveSchema), OrderController.save);
router.get("/product/:id", validate(OrderSchema.FindByProductIdSchema), OrderController.findByProductId);

export default router;
