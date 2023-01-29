require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    '<h1>STORE API</><br/><a href="api/v1/products">Back to Products</a>'
  );
});
app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log("Server is listening on port 3000");
    });
  } catch (error) {}
};

start();
