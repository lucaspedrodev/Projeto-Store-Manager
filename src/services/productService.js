const productModel = require('../models/productModel');

const allProducts = async () => {
  const products = await productModel.allProducts();

  return products;
};

const productById = async (id) => {
  const product = await productModel.productById(id);

  return product;
};

module.exports = {
  allProducts,
  productById,
};