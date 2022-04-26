import { ValidationError } from "express-validator";
import CustomError from "./CustomError";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");
  }

  serializeErrors(): { message: string; field?: string }[] {
    return this.errors.map((err: ValidationError) => {
      return { message: err.msg, field: err.param };
    });
  }
}
