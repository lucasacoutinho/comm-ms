import express, { Router } from "express";
import { authenticated, validate } from "../middleware";
import OrderController from "../controller/OrderController";
import { OrderFindByIdSchema, OrderFindByProductIdSchema, OrderSaveSchema } from "../schemas/OrderSchema";

const router: Router = express.Router();

router.use(authenticated);

router.get("/", OrderController.findAll);
router.get("/:id", validate(OrderFindByIdSchema), OrderController.findById);
router.post("/", validate(OrderSaveSchema), OrderController.save);
router.get("/product/:id", validate(OrderFindByProductIdSchema), OrderController.findByProductId);

export default router;
