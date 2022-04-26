import express, { Request, Response } from "express";
import Book from "../../domain/Book";

const router = express.Router();

router.get("/api/books", async (req: Request, res: Response) => {
  const books = await Book.find();

  return res.status(200).send(books);
});

export { router as getBooksRoute };
