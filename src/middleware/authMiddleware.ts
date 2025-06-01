import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    usuario_id?: number;
  }
}
interface JwtPayload {
  id: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  jwt.verify(token!, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Token Inválido" });
      return;
    }

    const payload = decoded as JwtPayload;
    req.usuario_id = payload.id;
    next();
  });
};

export default authMiddleware;
