const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  category_name: String,
});

const Category = model("category", categorySchema);

module.exports = { Category };
