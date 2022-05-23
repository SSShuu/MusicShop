const router = require("express").Router();
const fs = require("fs");
const { Order } = require("../Models/order.model");
const { CartItem } = require("../Models/cart-item.model");

router.get("/", (req, res) => {
  const recipt = fs.readFileSync(__dirname + "recipt.txt", "utf8");
  res.json(recipt);
});

router.get("/:email", async (req, res) => {
  const { id } = req.params;
  try {
    let txt = ``;
    const order = await Order.find({ email });
    const userIndex = order.length;
    const cartItems = await CartItem.find({
      shopping_cart: order[userIndex - 1].cart,
    });
    for (let i = 0; i < cartItems.length; i++) {
      txt += `
      ${cartItems[i].product_name} X ${cartItems[i].amount} , Total : ${cartItems[i].total_price}$
      `;
    }
    fs.writeFile(
      "recipt.txt",
      `
    Order number : ${order[userIndex - 1]._id}
    Customer ID : ${order[userIndex - 1].customer}
    Products : 
    ${txt}

    Total order price : ${order[userIndex - 1].total_price}$

    Thank you!
    `,
      async (err) => {
        if (err) throw { err: true, msg: "error" };
        res.download("recipt.txt");
      }
    );
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
