const mongoose = require("mongoose");

const connect_to_mongo_server = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Shopping-Online", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("Server Error");
  }
};

module.exports = connect_to_mongo_server;
