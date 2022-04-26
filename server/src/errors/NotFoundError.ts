import CustomError from "./CustomError";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor() {
    super("Route not found");
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "Not found" }];
  }
}
