import express, { Request, Response } from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./middlewares/ErrorHandler";
import { createBookRoute } from "./routes/books/createBook";
import { getBooksRoute } from "./routes/books/getBooks";
import { getBookRoute } from "./routes/books/getBook";
import { updateBookRoute } from "./routes/books/updateBook";
import { deleteBookRoute } from "./routes/books/deleteBook";
import cookieSession from "cookie-session";
import { signupRouter } from "./routes/auth/signup";
import { loginRouter } from "./routes/auth/login";
import { currentUserRoute } from "./routes/auth/currentUser";
import { signOutRoute } from "./routes/auth/signout";

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(getBooksRoute);
app.use(getBookRoute);
app.use(createBookRoute);
app.use(updateBookRoute);
app.use(deleteBookRoute);

app.use(signupRouter);
app.use(loginRouter);
app.use(currentUserRoute);
app.use(signOutRoute);

app.all("*", (req: Request, res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
