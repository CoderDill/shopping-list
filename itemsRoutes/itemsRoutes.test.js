process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let eggs = { name: "eggs", price: 5.99 };

beforeEach(function () {
  items.push(eggs);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);

    expect(res.body).toEqual({ items: [eggs] });
  });
});

describe("GET /items/:name", () => {
  test("Get an item", async () => {
    const res = await request(app).get(`/items/${eggs.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: eggs });
  });
  test("Respond with 404, invalid name or price", async () => {
    const res = await request(app).get(`/items/egg`);
    expect(res.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Add an item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "butter", price: 1.99 });
    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual({ item: { name: "butter", price: 1.99 } });
  });
});

describe("PATCH /items/:name", () => {
  test("Update item", async () => {
    const res = await request(app)
      .patch(`/items/${eggs.name}`)
      .send({ name: "organic eggs" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "organic eggs" } });
  });
  test("Resonds with 404, invalid name or price", async () => {
    const res = await request(app)
      .patch(`/items/egggs`)
      .send({ name: "organic eggs" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("DELETE an item", async () => {
    const res = await request(app).delete(`/items/${eggs.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Deleted" });
  });
  test("Resonds with 404, deleting invalid cat", async () => {
    const res = await request(app).delete(`/items/egggss`);
    expect(res.statusCode).toBe(404);
  });
});
