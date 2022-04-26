import request from "supertest";
import app from "../../../app";
import Book from "../../../domain/Book";
import { signin } from "../../../test/setup";

it("should return all the books from collection", async () => {
  await request(app).post("/api/books").set("Cookie", signin()).send({
    isbn: "isbn",
    title: "title",
    author: "author",
  });
  await request(app).post("/api/books").set("Cookie", signin()).send({
    isbn: "isbn2",
    title: "title",
    author: "author",
  });
  const collectionBooks = await Book.find();

  const response = await request(app).get("/api/books").send();

  expect(collectionBooks.length).toEqual(response.body.length);
});
