import express, { Router } from "express";
import OrderController from "../controller/OrderController";
import validate from "../middleware/validate";
import { OrderFindByIdSchema, OrderSaveSchema } from "../schemas/OrderSchema";
import authenticated from "../middleware/authenticated";

const router: Router = express.Router();


router.use(authenticated);

router.get("/", OrderController.findAll);
router.get("/:id", validate(OrderFindByIdSchema), OrderController.findById);
router.post("/", validate(OrderSaveSchema), OrderController.save);

export default router;
