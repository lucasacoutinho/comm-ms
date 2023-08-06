import { NextFunction, Request, Response } from "express";
import { compare, hash } from "../utils/hash";
import { env } from "../config/env";
import jwt from "jsonwebtoken";
import UserService from "../service";
import { AuthException } from "../exception";
import HttpStatusCode from "../enum/HttpStatusCode";
import { User } from "../entity/User";
import logger from "../utils/logger";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.findByEmail(email as string);

    const passwordMatch = await compare(password as string, user.password);
    if (!passwordMatch) {
      return next(new AuthException("Invalid Credentials.", HttpStatusCode.UNAUTHORIZED));
    }

    const token = jwt.sign({ id: user.id }, env.API_SECRET, { expiresIn: "1d" });

    const response = {
      token: token
    };

    logger(req, response);

    return res.status(HttpStatusCode.OK).json(response);
  } catch (error) {
    return next(error);
  }
};

const store = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  try {
    const data = new User();
    data.email = email;
    data.name = name;
    data.password = await hash(password);

    const user = await UserService.create(data);

    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
    logger(req, response);
    return res.status(HttpStatusCode.CREATED).json(response);
  } catch (error) {
    return next(error);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  const { auth } = req;
  const { id } = req.params;
  try {
    if (auth !== Number(id)) {
      return next(new AuthException("Unauthorized", HttpStatusCode.FORBIDDEN));
    }

    const user = await UserService.findById(Number(id));

    const response = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
    logger(req, response);
    return res.status(HttpStatusCode.CREATED).json(response);
  } catch (error) {
    return next(error);
  }
};

export default { login, store, show };
