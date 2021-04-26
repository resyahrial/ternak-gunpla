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

describe("testing POST /products", () => {
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
    it("should return status code 201", (done) => {
      request(app)
        .post("/products")
        .set("access_token", admin_token)
        .field("title", product.title)
        .field("price", product.price)
        .field("stock", product.stock)
        .field("CategoryId", product.CategoryId)
        .attach("fileTest", product.image_url)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(201);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("id");
            expect(typeof res.body.id).toEqual("number");
            expect(res.body).toHaveProperty("title", product.title);
            expect(res.body).toHaveProperty("image_url");
            expect(typeof res.body.image_url).toEqual("string");
            expect(res.body).toHaveProperty("price", product.price);
            expect(res.body).toHaveProperty("stock", product.stock);
            expect(res.body).toHaveProperty("CategoryId", product.CategoryId);
            done();
          }
        });
    });
  });

  describe("failed case with status code 401", () => {
    it("should return error when not passed access_token", (done) => {
      request(app)
        .post("/products")
        .field("title", product.title)
        .field("price", product.price)
        .field("stock", product.stock)
        .field("CategoryId", product.CategoryId)
        .attach("fileTest", product.image_url)
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
        .post("/products")
        .set("access_token", cust_token)
        .field("title", product.title)
        .field("price", product.price)
        .field("stock", product.stock)
        .field("CategoryId", product.CategoryId)
        .attach("fileTest", product.image_url)
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
    ["title", "empty", { ...product, title: "" }, "Title is required"],
    ["price", "empty", { ...product, price: "" }, "Price is required"],
    [
      "price",
      "not number",
      { ...product, price: "asdasd" },
      "Price must be number",
    ],
    [
      "price",
      "negative value",
      { ...product, price: -300000 },
      "Price must be greater then 0",
    ],
    ["stock", "empty", { ...product, stock: "" }, "Stock is required"],
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
    [
      "CategoryId",
      "empty",
      { ...product, CategoryId: "" },
      "CategoryId is required",
    ],
  ])(
    "failed case with status code 400",
    (attribute, testCase, input, expected) => {
      it(`should return message '${expected}' when ${attribute} is '${testCase}'`, (done) => {
        request(app)
          .post("/products")
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

  describe("failed case with status code 400", () => {
    it("should return 'Image is required' when image not attached", (done) => {
      request(app)
        .post("/products")
        .set("access_token", admin_token)
        .field("title", product.title)
        .field("price", product.price)
        .field("stock", product.stock)
        .field("CategoryId", product.CategoryId)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            expect(res.statusCode).toEqual(400);
            expect(typeof res.body).toEqual("object");
            expect(res.body).toHaveProperty("message", "Image is required");
            done();
          }
        });
    });
  });
});
