import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import AuthException from "../exception/AuthException";
import HttpStatusCode from "../enum/HttpStatusCode";

const verify = (token: string): Promise<JwtPayload | string | undefined> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.API_SECRET, {}, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    });
  });
};

const authenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AuthException("Unauthorized", HttpStatusCode.UNAUTHORIZED);
    }

    const token = (authorization as string)?.replace("Bearer", "").trim();
    const decoded = (await verify(token)) as { id: number; iat: number; exp: number };

    req.auth = decoded.id;

    return next();
  } catch (error: unknown) {
    if (error instanceof AuthException) {
      return res.status(error.status).json({ message: error.message });
    }
  }
};

export default authenticated;
