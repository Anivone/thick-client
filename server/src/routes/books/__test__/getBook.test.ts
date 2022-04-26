import request from "supertest";
import app from "../../../app";
import mongoose from "mongoose";
import { signin } from "../../../test/setup";

it("should return a 400 with not existing book id", async () => {
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
    .get(`/api/books/${new mongoose.Types.ObjectId().toHexString()}`)
    .send()
    .expect(400);
});

it("should return a 200 with existing book id", async () => {
  const response = await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(200);

  const bookResponse = await request(app)
    .get(`/api/books/${response.body.id}`)
    .send()
    .expect(200);

  expect(response.body.isbn).toEqual(bookResponse.body.isbn);
  expect(response.body.title).toEqual(bookResponse.body.title);
  expect(response.body.author).toEqual(bookResponse.body.author);
});
