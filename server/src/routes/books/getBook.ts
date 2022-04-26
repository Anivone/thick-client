import express, { Request, Response } from "express";
import Book from "../../domain/Book";
import { BadRequestError } from "../../errors/BadRequestError";

const router = express.Router();

router.get("/api/books/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (!book) {
    throw new BadRequestError("No book with such id");
  }

  return res.status(200).send(book);
});

export { router as getBookRoute };
