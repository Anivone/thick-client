import express, { Request, Response } from "express";
import Book from "../../domain/Book";
import { BadRequestError } from "../../errors/BadRequestError";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/ValidateRequest";
import { currentUser } from "../../middlewares/CurrentUser";
import { requireAdmin } from "../../middlewares/RequireAdmin";

const router = express.Router();

router.put(
  "/api/books/:id",
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
    const { id } = req.params;
    const { isbn, title, author } = req.body;

    const book = await Book.findById(id);

    if (!book) {
      throw new BadRequestError("No book with such id");
    }

    book.set({
      isbn,
      title,
      author,
    });
    await book.save();

    return res.status(200).send(book);
  }
);

export { router as updateBookRoute };
