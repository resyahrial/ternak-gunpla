const request = require("supertest");

const app = require("../app");
const { admin_token, cust_token } = require("./factory/tokenFactory");

const product = {
  title: "RG Barbatos",
  image_url: "./test/image/image.jpg",
  price: 300000,
  stock: 2,
  CategoryId: 3,
};

let productId = "";

describe("testing PATCH /products", () => {
  beforeAll((done) => {
    request(app)
      .post("/products")
      .set("access_token", admin_token)
      .field("title", product.title)
      .field("price", product.price)
      .field("stock", product.stock)
      .field("CategoryId", product.CategoryId)
      .attach("fileTest", product.image_url)
      .end((err, res) => {
        productId = res.body.id;
        done();
      });
  });

  afterAll((done) => {
    let container = [];
    request(app)
      .get("/products")
      .set("access_token", admin_token)
      .end((err, res) => {
        container = res.body;
      });
    container.forEach((el) => {
      request(app)
        .delete(`/products/${el.id}`)
        .set("access_token", admin_token)
        .end(() => done());
    });
  });

  describe("success case", () => {
    it("should return status code 200 and only stock which change", (done) => {
      request(app)
        .patch(`/products/${productId}/stock`)
        .set("access_token", admin_token)
        .send({
          stock: 0,
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body[0]).toEqual("object");
            expect(res.body[0]).toHaveProperty("id");
            expect(typeof res.body[0].id).toEqual("number");
            expect(res.body[0]).toHaveProperty("title", product.title);
            expect(res.body[0]).toHaveProperty("image_url");
            expect(typeof res.body[0].image_url).toEqual("string");
            expect(res.body[0]).toHaveProperty("price", product.price);
            expect(res.body[0]).toHaveProperty("stock", 0);
            expect(res.body[0]).toHaveProperty(
              "CategoryId",
              product.CategoryId
            );
            done();
          }
        });
    });
  });

  describe("failed case with status code 401", () => {
    it("should return error when not passed access_token", (done) => {
      request(app)
        .patch(`/products/${productId}/stock`)
        .send({
          stock: 0,
        })
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

    it("should return error when passing access_token for non admin user", (done) => {
      request(app)
        .patch(`/products/${productId}/stock`)
        .set("access_token", cust_token)
        .send({
          stock: 0,
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(401);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Access restricted! Admin only"
            );
            done();
          }
        });
    });
  });
});
