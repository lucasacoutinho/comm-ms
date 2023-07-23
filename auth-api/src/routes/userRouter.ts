import authenticated from "../middleware/authenticated";
import UserController from "../controller/UserController";
import validate from "../middleware/validate";
import AuthSchema from "../schemas/AuthSchema";
import { UserSchema, UserFindByIdSchema } from "../schemas/UserSchema";
import express, { Request, Response, Router } from "express";

const userRouter: Router = express.Router();

userRouter.post("/user", validate(UserSchema), (req: Request, res: Response) => UserController.store(req, res));
userRouter.post("/user/auth", validate(AuthSchema), (req: Request, res: Response) => UserController.login(req, res));
userRouter.get(
  "/user/:id",
  authenticated,
  validate(UserFindByIdSchema),
  (req: Request<{ id?: number }>, res: Response) => UserController.show(req, res)
);

export default userRouter;
