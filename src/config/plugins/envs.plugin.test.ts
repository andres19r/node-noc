import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_EMAIL: "trappy19q@gmail.com",
      MAILER_SERVICE: "gmail",
      MAILER_SECRET_KEY: "fdrhtxpbkwmgjwwl",
      PROD: false,
      MONGO_URL: "mongodb://andres:123456789@localhost:27017",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_USER: "andres",
      MONGO_PASS: "123456789",
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
