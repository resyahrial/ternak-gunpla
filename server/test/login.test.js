const request = require("supertest");

const app = require("../app");

describe("testing /login", () => {
  describe("success case", () => {
    it("should return status code 200", (done) => {
      const body = {
        email: "admin@mail.com",
        password: "admin",
      };

      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("access_token");
            done();
          }
        });
    });
  });

  describe("failed case with status code 400", () => {
    it("should return error message when not input email nor password", (done) => {
      const body = {
        email: "",
        password: "",
      };

      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Please fill all fields"
            );
            done();
          }
        });
    });

    it("should return error when not input password", (done) => {
      const body = {
        email: "admin@mail.com",
        password: "",
      };

      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Please fill all fields"
            );
            done();
          }
        });
    });

    it("should return error when password is wrong", (done) => {
      const body = {
        email: "admin@mail.com",
        password: "qwerty",
      };

      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Invalid email / password"
            );
            done();
          }
        });
    });

    it("should return error when email not found", (done) => {
      const body = {
        email: "admin2@mail.com",
        password: "admin",
      };

      request(app)
        .post("/login")
        .send(body)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Invalid email / password"
            );
            done();
          }
        });
    });
  });
});
