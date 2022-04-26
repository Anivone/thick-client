import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/RequestValidationError";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.array().length) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
