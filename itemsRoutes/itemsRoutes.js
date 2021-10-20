const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../fakeDb");

router.get("/", (req, res, next) => {
  res.json({ items });
});

router.post("/", (req, res, next) => {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json({ item: newItem });
});

router.get("/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ item });
});

router.patch("/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  item.name = req.body.name;
  item.price = req.body.price;

  res.json({ item });
});

router.delete("/:name", (req, res, next) => {
  const item = items.find((i) => i.name === req.params.name);
  if (item === -1) {
    throw new ExpressError("Item not found", 404);
  }
  items.splice(item, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
