const router = require("express").Router();
const { Order } = require("../Models/order.model");
const authJWT = require("../authJWT");

router.get("/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const order = await Order.find({ email });
    res.send(order);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    Order.find((err, orders) => {
      if (!err) {
        res.json(orders);
      } else res.json({ error: true, error });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  const {
    cart,
    email,
    first_name,
    last_name,
    company,
    total_price,
    shipping_street,
    shipping_country,
    phone_number,
    credit_expiration_date,
    credit_card_verification,
    credit_card,
    shipping_date,
  } = req.body;
  try {
    const newOrder = new Order({
      cart,
      email,
      first_name,
      last_name,
      company,
      total_price,
      shipping_street,
      shipping_country,
      phone_number,
      credit_expiration_date,
      credit_card_verification,
      credit_card,
      shipping_date,
    });
    newOrder.save((err, order) => {
      if (!err) {
        res.json({ err: false, order });
      } else res.status(401).json(err);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
