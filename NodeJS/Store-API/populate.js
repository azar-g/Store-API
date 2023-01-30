require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require("./products.json");

const connect = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("success");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

connect();
