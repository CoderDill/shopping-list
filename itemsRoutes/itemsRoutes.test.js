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
    request.Test("Get all items", async () => {
        const res = await request(app).get("/items")
        expect(res.statusCode).toBe(200)
    })
})