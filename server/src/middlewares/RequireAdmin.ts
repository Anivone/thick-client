import { MyRequest } from "./CurrentUser";
import { NextFunction, Response } from "express";
import { Roles } from "../domain/User";
import { ForbiddenError } from "../errors/ForbiddenError";

export const requireAdmin = (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.currentUser?.role !== Roles.ADMIN) {
    throw new ForbiddenError();
  }

  next();
};
