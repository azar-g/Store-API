const mongoose = require("mongoose");
const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ price: { $gte: 30, $lt: 100 } }).sort(
    "price"
  );
  res.status(200).json({ products, number: products.length });
};

const getAllProducts = async (req, res) => {
  console.log(req.query);
  const { name, company, featured, sort, field } = req.query;

  const queryObject = {};

  if (name) queryObject.name = { $regex: name, $options: "i" };

  if (company) queryObject.company = company;

  if (featured) queryObject.featured = req.query.featured;

  let results = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    console.log(sortList);
    results = results.sort(sortList);
  } else results = results.sort("price");

  if (field) {
    const fieldList = field.split(",").join(" ");
    results = results.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  results = results.skip(skip).limit(limit);

  const products = await results;
  res.status(200).json({ products, number: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
