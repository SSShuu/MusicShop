const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

const User = model("user", userSchema);

module.exports = { User };
