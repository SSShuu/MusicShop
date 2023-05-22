const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  product_name: String,
  product_price: Number,
  product_images: Array,
  new: {
    type: Boolean,
    default: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
});

const Product = model("product", productSchema);

module.exports = { Product };
