const request = require("supertest");

const app = require("../app");
const { admin_token } = require("./factory/tokenFactory");

describe("testing GET /products", () => {
  describe("success case", () => {
    it("should return status code 200", (done) => {
      request(app)
        .get("/categories")
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(typeof res.body[0]).toEqual("object");
            expect(res.body[0]).toHaveProperty("id");
            expect(typeof res.body[0].id).toEqual("number");
            expect(res.body[0]).toHaveProperty("title");
            expect(typeof res.body[0].title).toEqual("string");
            done();
          }
        });
    });
  });

  describe("failed case with status code 401", () => {
    it("should return error when not passed access_token", (done) => {
      request(app)
        .get("/categories")
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Please login first");
            done();
          }
        });
    });
  });
});
