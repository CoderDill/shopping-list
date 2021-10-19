const express = require("express");
const ExpressError = require("./expressError");
const itemsRoutes = require("./itemsRoutes");
const app = express();

app.use(express.json());

app.use("/items", itemsRoutes);

app.post("/items", (req, res, next) => {});

app.get("/items/:name", (req, res, next) => {});

app.patch("/items/:name", (req, res, next) => {});

app.delete("/items/:name", (req, res, next) => {});

app.get("favicon.ico", (req, res) => res.sendStatus(204));

app.use(function (req, res, next) {
  const error = new ExpressError("Not Found", 404);

  return next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500);

  return res.json({
    error: error,
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});
