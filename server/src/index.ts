import mongoose from "mongoose";
import app from "./app";
import path from "path";
import to from "await-to-js";
import DatabaseConnectionError from "./errors/DatabaseConnectionError";

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const start = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL must be specified");
  }

  if (!process.env.SERVER_PORT) {
    throw new Error("SERVER_PORT must be specified");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET must be specified");
  }

  const [err] = await to(mongoose.connect(process.env.MONGO_URL!));
  if (err) throw new DatabaseConnectionError();

  console.log("Successfully connected to MongoDB");

  app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is listening on port", process.env.SERVER_PORT!);
  });
};

start();
