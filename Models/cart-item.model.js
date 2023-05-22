const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
  product_name: String,
  amount: Number,
  product_price: Number,
  total_price: Number,
  image: String,
  shopping_cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
  },
});

const CartItem = model("cart-item", cartItemSchema);

module.exports = { CartItem };
