import express, { Request, Response } from "express";
import Book from "../../domain/Book";
import { BadRequestError } from "../../errors/BadRequestError";
import { currentUser } from "../../middlewares/CurrentUser";
import { requireAdmin } from "../../middlewares/RequireAdmin";

const router = express.Router();

router.delete(
  "/api/books/:id",
  currentUser,
  requireAdmin,
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      throw new BadRequestError("No book with such id");
    }

    await book.remove();

    res.status(200).send();
  }
);

export { router as deleteBookRoute };
