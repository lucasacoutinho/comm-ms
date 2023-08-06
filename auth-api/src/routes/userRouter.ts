import express, { Router } from "express";
import { authenticated, validate } from "../middleware";
import { AuthSchema, UserSchema } from "../schema";
import { UserController } from "../controller";

const userRouter: Router = express.Router();

userRouter.post("/", validate(UserSchema.UserStoreSchema), UserController.store);
userRouter.post("/auth", validate(AuthSchema), UserController.login);

userRouter.use(authenticated);
userRouter.get("/:id", validate(UserSchema.UserFindByIdSchema), UserController.show);

export default userRouter;
