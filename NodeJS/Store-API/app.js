require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connect = require("./db/connect");

const express = require("express");
const app = express();
const productRouter = require("./routes/products");
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<h1>STORE API</><br/><a href="api/v1/products">Back to Products</a>'
  );
});
app.use("/api/v1/products", productRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("connected to DB");
    });
  } catch (error) {
    console.log(error);
  }
};

start();
