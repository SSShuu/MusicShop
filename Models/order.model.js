const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  cart: {
    type: Schema.Types.ObjectId,
    ref: "cart",
  },
  email: String,
  first_name: String,
  last_name: String,
  company: String,
  total_price: Number,
  shipping_street: String,
  shipping_city: String,
  shipping_country: String,
  phone_number: String,
  credit_expiration_date: String,
  credit_card_verification: String,
  credit_card: String,
  shipping_date: String,
  order_date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = model("order", orderSchema);

module.exports = { Order };
