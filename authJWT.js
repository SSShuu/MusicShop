const jwt = require("jsonwebtoken");

const authJWT = (req, res, next) => {
  try {
    const bearer = req.header("Authorization").split(" ");
    const token = bearer[1];
    if (token == null) res.json({ message: "Unauthorized" });
    jwt.verify(token, "secretAccesstKey", (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};
module.exports = authJWT;
