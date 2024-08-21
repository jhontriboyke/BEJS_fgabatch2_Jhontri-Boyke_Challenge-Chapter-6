const app = require("../app");
const request = require("supertest");
require("dotenv").config();

describe("GET /images", () => {
  it("should return success and 200 status code", async () => {
    const res = await request(app).get("/images");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("success");
    expect(res.body.status).toBe(true);
  });
});
