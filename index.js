const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const connect_to_mongo_server = require("./dbConfig");

const { initCategories } = require("./Models/category.model");
const { initProducts } = require("./Models/product.model");

connect_to_mongo_server();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./Routes/auth.routes"));
app.use("/item", require("./Routes/cart-items.routes"));
app.use("/cart", require("./Routes/carts.routes"));
app.use("/category", require("./Routes/categories.routes"));
app.use("/order", require("./Routes/orders.routes"));
app.use("/product", require("./Routes/products.routes"));
app.use("/recipt", require("./Routes/recipt.routes"));

app.listen(port, () => console.log(`Server is Up & Running on port ${port}`));

module.exports = app;
