const mongoose = require("mongoose");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const products = await Product.find(req.query);
  res.status(200).json({ products, number: products.length });
};

const getAllProductsStatic = async (req, res) => {
  console.log(req.query);

  const queryObject = {};

  const { name } = req.query;
  if (name) queryObject.name = { $regex: name, $options: "i" };

  const { company } = req.query;
  if (company) queryObject.company = company;

  const { featured } = req.query;
  if (featured) queryObject.featured = req.query.featured;

  const products = await Product.find(queryObject);
  res.status(200).json({ products, number: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
