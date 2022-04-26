import CustomError from "./CustomError";

export class ForbiddenError extends CustomError {
  statusCode: number = 403;

  constructor() {
    super("Forbidden error");
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "You are not allowed to access this route" }];
  }
}
