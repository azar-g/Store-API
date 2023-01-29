const getAllProducts = (req, res) => {
  throw new Error("something happened");
  res.status(200).json({ msg: "products" });
};
const getAllProductsStatic = (req, res) => {
  res.status(200).json({ msg: "productsStatic" });
};

module.exports = { getAllProducts, getAllProductsStatic };
