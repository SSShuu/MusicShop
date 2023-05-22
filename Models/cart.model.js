const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  cart_creation_date: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = model("cart", CartSchema);

module.exports = { Cart };
