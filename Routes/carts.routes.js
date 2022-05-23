const router = require("express").Router();
const { Cart } = require("../Models/cart.model");
const { CartItem } = require("../Models/cart-item.model");
const { Order } = require("../Models/order.model");
const authJWT = require("../authJWT");

router.get("/:customerID", authJWT, async (req, res) => {
  const { customerID } = req.params;
  try {
    Cart.find({ customer_id: customerID })
      .populate({
        path: "customer",
      })
      .exec((err, cart) => {
        if (!err) {
          res.json(cart);
        } else res.json({ error: true, err });
      });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/:customerID/:cartID", authJWT, async (req, res) => {
  const { customerID, cartID } = req.params;
  try {
    const cartItems = await CartItem.find({ shopping_cart: cartID });
    const order = await Order.find({ customer: customerID });

    if (cartItems.length === 0 && order.length === 0) {
      res.json({ userStatus: "first_time" });
    } else {
      if (order.length !== 0) {
        res.send({ userStatus: "ordered", order: order[0] });
      } else {
        res.json({ userStatus: "open_cart", cartItems });
      }
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = new Cart();
    newCart.save((err, cart) => {
      if (!err) {
        res.send(cart);
      } else res.json(err);
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
