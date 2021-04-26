const request = require("supertest");

const app = require("../app");
const { admin_token, cust_token } = require("./factory/tokenFactory");

let product = {
  title: "RG Barbatos",
  image_url: "./test/image/image.jpg",
  price: 300000,
  stock: 2,
  CategoryId: 3,
};

let productId = "";

describe("testing DELETE /products", () => {
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

  describe("success case", () => {
    it("should return status code 200", (done) => {
      request(app)
        .delete(`/products/${productId}`)
        .set("access_token", admin_token)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty(
              "message",
              "Product deleted successfully"
            );
            done();
          }
        });
    });
  });

  describe("failed case with status code 401", () => {
    it("should return error when not passed access_token", (done) => {
      request(app)
        .delete(`/products/${productId}`)
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
        .delete(`/products/${productId}`)
        .set("access_token", cust_token)
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
