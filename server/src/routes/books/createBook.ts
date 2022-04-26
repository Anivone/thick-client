import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/ValidateRequest";
import Book, { BookDocument } from "../../domain/Book";
import to from "await-to-js";
import { BadRequestError } from "../../errors/BadRequestError";
import { currentUser } from "../../middlewares/CurrentUser";
import { requireAdmin } from "../../middlewares/RequireAdmin";

const router = express.Router();

router.post(
  "/api/books",
  currentUser,
  requireAdmin,
  [
    body("isbn").not().isEmpty().withMessage("'ISBN' field must not be empty"),
    body("title")
      .not()
      .isEmpty()
      .withMessage("'Title' field must not be empty"),
    body("author")
      .not()
      .isEmpty()
      .withMessage("'Author' field must not be empty"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { isbn, title, author } = req.body;

    const existingBook = await Book.findOne({ isbn });

    if (existingBook) {
      throw new BadRequestError("A book with such ISBN already exists");
    }

    const book = Book.build({ isbn, title, author });
    await book.save();

    return res.status(200).send(book);
  }
);

export { router as createBookRoute };
