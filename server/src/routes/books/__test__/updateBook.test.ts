import request from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
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
    .put(`/api/books/${new mongoose.Types.ObjectId().toHexString()}`)
    .set("Cookie", signin())
    .send({
      isbn: "new-isbn",
      title: "new-title",
      author: "new-author",
    })
    .expect(400);
});

it("should return a 200 with not valid request params", async () => {
  const response = await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(200);

  await request(app)
    .put(`/api/books/${response.body.id}`)
    .set("Cookie", signin())
    .send({
      isbn: "",
      title: "new-title",
      author: "new-author",
    })
    .expect(400);

  await request(app)
    .put(`/api/books/${response.body.id}`)
    .set("Cookie", signin())
    .send({
      isbn: "new-isbn",
      title: "",
      author: "new-author",
    })
    .expect(400);

  await request(app)
    .put(`/api/books/${response.body.id}`)
    .set("Cookie", signin())
    .send({
      isbn: "new-isbn",
      title: "new-title",
      author: "",
    })
    .expect(400);
});

it("should return a 200 with valid request params", async () => {
  const response = await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(200);

  const isbn = "new-isbn";
  const title = "new-title";
  const author = "new-author";

  const bookResponse = await request(app)
    .put(`/api/books/${response.body.id}`)
    .set("Cookie", signin())
    .send({
      isbn,
      title,
      author,
    })
    .expect(200);

  expect(bookResponse.body.isbn).toEqual(isbn);
  expect(bookResponse.body.title).toEqual(title);
  expect(bookResponse.body.author).toEqual(author);
});
