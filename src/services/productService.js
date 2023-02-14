const productModel = require('../models/productModel');

const allProducts = async () => {
  const products = await productModel.allProducts();

  return products;
};

const productById = async (id) => {
  const product = await productModel.productById(id);

  return product;
};

const productRegistration = (name) => {
  const addProducts = productModel.productRegistration(name);

  return addProducts;
};

module.exports = {
  allProducts,
  productById,
  productRegistration,
};