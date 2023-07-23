import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import AuthException from "../exception/AuthException";
import UserException from "../exception/UserException";
import IUserService from "../service/IUserService";
import UserService from "../service/UserService";
import { compare, hash } from "../utils/hash";
import HttpStatusCode from "../enum/HttpStatusCode";
import { User } from "../entity/User";

class UserController {
  constructor(private userService: IUserService) {}

  public async login(req: Request<unknown, unknown, { email: string; password: string }>, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this.userService.findByEmail(email);

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        throw new AuthException("Invalid Credentials.", HttpStatusCode.UNAUTHORIZED);
      }

      const token = jwt.sign({ id: user.id }, env.API_SECRET, { expiresIn: "1d" });

      return res.status(HttpStatusCode.OK).json({
        data: {
          token: token
        }
      });
    } catch (error) {
      if (error instanceof AuthException) {
        return res.status(error.status).json({ message: error.message });
      }

      if (error instanceof UserException) {
        return res.status(error.status).json({ message: error.message });
      }

      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  public async store(req: Request<unknown, unknown, { name: string; password: string; email: string }>, res: Response) {
    const { name, email, password } = req.body;
    try {
      const data = new User();
      data.email = email;
      data.name = name;
      data.password = await hash(password);

      const user = await this.userService.create(data);

      return res.status(HttpStatusCode.CREATED).json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      if (error instanceof UserException) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }

  public async show(req: Request<{ id?: number }>, res: Response) {
    const { auth } = req;
    const { id } = req.params;
    try {
      if (auth !== Number(id)) {
        throw new AuthException("Unauthorized", HttpStatusCode.FORBIDDEN);
      }

      const user = await this.userService.findById(id as number);

      return res.status(HttpStatusCode.OK).json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      if (error instanceof AuthException) {
        return res.status(error.status).json({ message: error.message });
      }
      if (error instanceof UserException) {
        return res.status(error.status).json({ message: error.message });
      }
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
}

export default new UserController(UserService);
