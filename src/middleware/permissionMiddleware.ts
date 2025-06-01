import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const permissionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export default permissionMiddleware;
