const request = require("supertest");

const app = require("../app");
const { admin_token } = require("./factory/tokenFactory");

const products = [
  {
    title: "RG Barbatos",
    image_url: "./test/image/image.jpg",
    price: 300000,
    stock: 2,
    CategoryId: 3,
  },
  {
    title: "PG Unicorn",
    image_url: "./test/image/image.jpg",
    price: 400000,
    stock: 1,
    CategoryId: 5,
  },
];

let container = [];

describe("testing GET /products", () => {
  beforeAll((done) => {
    products.forEach((product) => {
      request(app)
        .post("/products")
        .set("access_token", admin_token)
        .field("title", product.title)
        .field("price", product.price)
        .field("stock", product.stock)
        .field("CategoryId", product.CategoryId)
        .attach("fileTest", product.image_url)
        .end((err, res) => {
          container.push(res.body);
          done();
        });
    });
  });

  afterAll((done) => {
    container.forEach((el) => {
      request(app)
        .delete(`/products/${el.id}`)
        .set("access_token", admin_token)
        .end(() => done());
    });
  });

  describe("success case", () => {
    it("should return status code 200", (done) => {
      request(app)
        .get("/products")
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
            expect(res.body[0]).toHaveProperty("title", products[0].title);
            expect(res.body[0]).toHaveProperty("image_url");
            expect(typeof res.body[0].image_url).toEqual("string");
            expect(res.body[0]).toHaveProperty("price", products[0].price);
            expect(res.body[0]).toHaveProperty("stock", products[0].stock);
            expect(res.body[0]).toHaveProperty(
              "CategoryId",
              products[0].CategoryId
            );
            expect(res.body[0]).toHaveProperty("Category");
            expect(typeof res.body[0].Category).toEqual("object");
            expect(res.body[0].Category).toHaveProperty("title");
            done();
          }
        });
    });
  });

  describe("failed case with status code 401", () => {
    it("should return error when not passed access_token", (done) => {
      request(app)
        .get("/products")
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
