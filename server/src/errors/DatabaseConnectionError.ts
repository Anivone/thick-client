import CustomError from "./CustomError";

export default class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;

  constructor() {
    super("Error connecting to MongoDB");
  }

  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "Error connecting to database" }];
  }
}
