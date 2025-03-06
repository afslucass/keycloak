import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "../error/AuthenticationError";

export const auth = (req: Request<any>, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  const PUBLIC_KEY = process.env.KEYCLOAK_PUBLIC_KEY;

  if (token) {
    try {
      const decoded = jwt.verify(token, PUBLIC_KEY!, { algorithms: ["RS256"] });

      // da para agent acessar os valores dentro do jwt, fazer autorizacao, etc
      console.log((decoded as any).scope);
    } catch (err: any) {
      next(new AuthenticationError(err.message));
    }
    next();
    return;
  }
  next(new AuthenticationError());
};
