import request from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import Book from "../../../domain/Book";
import { signin } from "../../../test/setup";

it("should return 400 on not existing book id", async () => {
  await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(200);

  await request(app)
    .delete(`/api/books/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", signin())
    .send({
      isbn: "new-isbn",
      title: "new-title",
      author: "new-author",
    })
    .expect(400);
});

it("should return 200 on successful book deletion", async () => {
  const response = await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(200);

  let booksList = await Book.find({});

  expect(booksList.length).toEqual(1);

  await request(app)
    .delete(`/api/books/${response.body.id}`)
    .set("Cookie", signin())
    .send()
    .expect(200);

  booksList = await Book.find({});

  expect(booksList.length).toEqual(0);
});
