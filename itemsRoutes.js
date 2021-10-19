const express = require("express");
const router = new express.Router();

const ITEMS = [{ name: "butter", price: 1.99 }];

router.get("/", (req, res, next) => {
  res.json({ items: ITEMS });
});

router.get("/:name", (req, res, next) => {
  const item = ITEMS.find((i) => i.name === req.params.name);
  res.json({ item });
});

module.exports = router;
