const router = require("express").Router();
const { Router } = require("express");
const { CartItem } = require("../Models/cart-item.model");
const authJWT = require("../authJWT");
const { Cart } = require("../Models/cart.model");

router.post("/", async (req, res) => {
  const {
    product_name,
    product_price,
    total_price,
    shopping_cart,
    image,
    amount,
  } = req.body;
  try {
    const existingProduct = await CartItem.find({ product_name });
    if (existingProduct.length > 0) {
      res.json({
        itemExisting: true,
        existingProduct
      });
    } else {
      const newProductToCart = new CartItem({
        product_name,
        product_price,
        total_price,
        amount,
        image,
        shopping_cart,
      });

      newProductToCart.save((err, newProduct) => {
        if (!err) {
          res.send(newProduct);
        } else res.send({ error: true, err });
      });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/:cartID", async (req, res) => {
  const { cartID } = req.params;
  try {
    CartItem.find({ shopping_cart: cartID }, (err, cartItems) => {
      if (!err) {
        res.json(cartItems);
      } else res.json({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:itemID", async (req, res) => {
  const { itemID } = req.params;
  try {
    CartItem.findByIdAndRemove(itemID, (err, items) => {
      if (!err) {
        res.send(items);
      } else res.send({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.delete("/reset/:cartID", async (req, res) => {
  const { cartID } = req.params;
  try {
    CartItem.deleteMany({ shopping_cart: cartID }, (err, cartItems) => {
      if (!err) {
        res.json({ deleted: cartItems });
      } else res.send({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    amount,
    product_name,
    product_price,
    total_price,
    image,
    shopping_cart,
  } = req.body;
  CartItem.findByIdAndUpdate(
    id,
    {
      $set: {
        amount,
        product_name,
        product_price,
        total_price,
        image,
        shopping_cart,
      },
    },
    { new: true },
    (err, result) => {
      if (!err) {
        res.send(result);
      } else res.send({ error: true, err });
    }
  );
  try {
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
