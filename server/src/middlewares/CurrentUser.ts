import { NextFunction, Request, Response } from "express";
import { Roles } from "../domain/User";
import jwt from "jsonwebtoken";

interface CurrentUser {
  id: string;
  login: string;
  role: Roles;
}

export interface MyRequest extends Request {
  currentUser?: CurrentUser;
}

export const currentUser = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    req.currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as CurrentUser;
  } catch (err) {}

  next();
};
