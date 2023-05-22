const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.model");

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, confirmPassword } = req.body;
  try {
    const hash = await bcrypt.hash(password, 12);
    const user = await User.find({ email });
    if (user.length > 0) {
      return res.json({
        error: true,
        message: "This mail addres is already in use, please try another one ",
      });
    }
    if (password !== confirmPassword) {
      return res.json({
        error: true,
        message: "PASSWORD AND CONFIRM PASSWORD DO NOT MATCH",
      });
    }
    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hash,
    });
    newUser.save((err, result) => {
      if (!err) {
        res.status(200).json({ newUser: true, result });
      } else res.json({ error: true, err });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: true, message: `User doesn't exist` });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.json({
        error: true,
        message: "Incorrect details",
      });
    const access_token = jwt.sign({ user }, "secretAccesstKey", {
      expiresIn: "50m",
    });
    res.json({ access_token });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.put("/edit", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
module.exports = router;
