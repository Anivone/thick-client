import request from "supertest";
import app from "../../../app";
import { signin } from "../../../test/setup";

it("should return 400 if the request is not valid", async () => {
  await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({})
    .expect(400);
  await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "",
      title: "title",
      author: "author",
    })
    .expect(400);
  await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "",
      author: "author",
    })
    .expect(400);
  await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn2",
      title: "title",
      author: "",
    })
    .expect(400);
});

it("should return 400 if the isbn is already in use", async () => {
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
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(400);
});

it("should successfully create the book with valid inputs", async () => {
  await request(app)
    .post("/api/books")
    .set("Cookie", signin())
    .send({
      isbn: "isbn",
      title: "title",
      author: "author",
    })
    .expect(200);
});
