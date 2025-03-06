import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../error/AuthenticationError";

export const auth = (req: Request<any>, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const PUBLIC_KEY = process.env.KEYCLOAK_PUBLIC_KEY;

  if (token) {
    try {
      jwt.verify(token, PUBLIC_KEY!, { algorithms: ["RS256"] });
    } catch (err: any) {
      next(new AuthenticationError(err.message));
    }
    next();
  }
  next(new AuthenticationError());
};
