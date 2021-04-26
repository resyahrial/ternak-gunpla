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

const updatedProduct = {
  title: "PG Strike Freedom",
  image_url: "./test/image/image.jpg",
  price: 350000,
  stock: 5,
  CategoryId: 5,
};

let productId = "",
  latestUrl = "";

describe("testing PUT /products", () => {
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
        latestUrl = res.body.image_url;
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

  describe("success case with status code 200", () => {
    it("should return updated value (when not attach file)", (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set("access_token", admin_token)
        .field("title", updatedProduct.title)
        .field("price", updatedProduct.price)
        .field("stock", updatedProduct.stock)
        .field("CategoryId", updatedProduct.CategoryId)
        .field("latestUrl", latestUrl)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body[0]).toHaveProperty("id");
            expect(typeof res.body[0].id).toEqual("number");
            expect(res.body[0]).toHaveProperty("title", updatedProduct.title);
            expect(res.body[0]).toHaveProperty("image_url", latestUrl);
            expect(res.body[0]).toHaveProperty("price", updatedProduct.price);
            expect(res.body[0]).toHaveProperty("stock", updatedProduct.stock);
            expect(res.body[0]).toHaveProperty(
              "CategoryId",
              updatedProduct.CategoryId
            );
            done();
          }
        });
    });

    it("should return updated value", (done) => {
      request(app)
        .put(`/products/${productId}`)
        .set("access_token", admin_token)
        .field("title", updatedProduct.title)
        .field("price", updatedProduct.price)
        .field("stock", updatedProduct.stock)
        .field("CategoryId", updatedProduct.CategoryId)
        .field("latestUrl", latestUrl)
        .attach("fileTest", updatedProduct.image_url)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(200);
            expect(typeof res.body).toEqual("object");
            expect(res.body[0]).toHaveProperty("id");
            expect(typeof res.body[0].id).toEqual("number");
            expect(res.body[0]).toHaveProperty("title", updatedProduct.title);
            expect(res.body[0]).toHaveProperty("image_url");
            expect(typeof res.body[0].image_url).toEqual("string");
            expect(res.body[0]).toHaveProperty("price", updatedProduct.price);
            expect(res.body[0]).toHaveProperty("stock", updatedProduct.stock);
            expect(res.body[0]).toHaveProperty(
              "CategoryId",
              updatedProduct.CategoryId
            );
            done();
          }
        });
    });
  });

  describe("failed case with status code 401", () => {
    it("should return error when not passed access_token", (done) => {
      request(app)
        .put(`/products/${productId}`)
        .field("title", updatedProduct.title)
        .field("price", updatedProduct.price)
        .field("stock", updatedProduct.stock)
        .field("CategoryId", updatedProduct.CategoryId)
        .attach("fileTest", updatedProduct.image_url)
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
        .put(`/products/${productId}`)
        .set("access_token", cust_token)
        .field("title", updatedProduct.title)
        .field("price", updatedProduct.price)
        .field("stock", updatedProduct.stock)
        .field("CategoryId", updatedProduct.CategoryId)
        .attach("fileTest", updatedProduct.image_url)
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

  describe.each([
    [
      "price",
      "negative value",
      { ...product, price: -300000 },
      "Price must be greater then 0",
    ],
    [
      "stock",
      "not number",
      { ...product, stock: "asdasd" },
      "Stock must be number",
    ],
    [
      "stock",
      "negative value",
      { ...product, stock: -3 },
      "Stock must be greater then 0",
    ],
  ])(
    "failed case with status code 400",
    (attribute, testCase, input, expected) => {
      it(`should return message '${expected}' when ${attribute} is '${testCase}'`, (done) => {
        request(app)
          .put(`/products/${productId}`)
          .set("access_token", admin_token)
          .field("title", input.title)
          .field("price", input.price)
          .field("stock", input.stock)
          .field("CategoryId", input.CategoryId)
          .attach("fileTest", input.image_url)
          .end((err, res) => {
            if (err) {
              done(err);
            } else {
              expect(res.statusCode).toEqual(400);
              expect(typeof res.body).toEqual("object");
              expect(res.body).toHaveProperty("message", `${expected}`);
              done();
            }
          });
      });
    }
  );
});
