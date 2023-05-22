const router = require("express").Router();
const { Category } = require("../Models/category.model");
const authJWT = require("../authJWT");

router.get("/", async (req, res) => {
  try {
    Category.find((err, categories) => {
      if (!err) {
        res.json(categories);
      } else res.json({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
