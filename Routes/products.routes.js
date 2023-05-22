const router = require("express").Router();
const authJWT = require("../authJWT");
const { Product } = require("../Models/product.model");

router.get("/", async (req, res) => {
  try {
    Product.find((err, products) => {
      if (!err) {
        res.json(products);
      } else res.json({ error: true, error });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/new", async (req, res) => {
  try {
    Product.find({ new: true }, (err, products) => {
      if (!err) {
        res.json(products);
      } else res.json({ error: true, error });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/:categoryID", async (req, res) => {
  const { categoryID } = req.params;
  try {
    Product.find({ category: categoryID })
      .populate("category")
      .exec((err, products) => {
        if (!err) {
          res.json(products);
        } else res.json({ error: true, err });
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/item/:id", async (req, res) => {
  const { id } = req.params;
  try {
    Product.find({ _id: id }).exec((err, products) => {
      if (!err) {
        res.json(products[0]);
      } else res.json({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const { product_name, product_price, product_images, category } = req.body;
  try {
    const newProduct = new Product({
      product_name,
      product_price,
      product_images,
      category,
    });
    newProduct.save((err, product) => {
      if (!err) {
        res.send(product);
      } else res.send({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const options = { new: true };
    const result = await Product.findByIdAndUpdate(id, updates, options);
    res.json({ result });

    const { product_name, product_price, product_images, category } = req.body;
    Product.findByIdAndUpdate(
      id,
      { $set: { product_name, product_price, product_images, category } },
      { new: true },
      (err, result) => {
        if (!err) {
          res.send(result);
        } else res.send({ error: true, err });
      }
    );
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.delete("/delete/:itemID", async (req, res) => {
  const { itemID } = req.params;
  try {
    Product.findByIdAndRemove(itemID, (err, items) => {
      if (!err) {
        res.send(items);
      } else res.send({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
