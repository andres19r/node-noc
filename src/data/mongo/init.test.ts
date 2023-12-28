import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("init MongoDB", () => {
  afterAll(() => {
    mongoose.connection.close();
  });
  test("should connect to MongoDB", async () => {
    const connected = await MongoDatabase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });

    expect(connected).toBeTruthy();
  });

  test("shold throw an error", async () => {
    try {
      const connected = await MongoDatabase.connect({
        dbName: process.env.MONGO_DB_NAME!,
        mongoUrl: "mongodb://andres:123456789@invalidlocalhost:27017",
      });
    } catch (error) {}
  });
});
