const productModel = require('../models/productModel');

const allProducts = async () => {
  const products = await productModel.allProducts();
  if (!products) return { message: 'Product not found' };
  return products;
};

const productById = async (id) => {
  const product = await productModel.productById(id);
  if (!product) return { message: 'Product not found' };
  return product;
};

const productRegistration = async (name) => {
  const addProducts = await productModel.productRegistration(name);

  return addProducts;
};

const updateProducts = (id, name) => { // 2 parametros
  const productsUpdated = productModel.updateProducts(id, name); // camada externa = mock
  if (!productsUpdated) return { message: 'Product not found' }; // 1 retorno
    return productsUpdated; // 2 retorno
};

const deleteProducts = async (id) => {
  const productId = await productModel.productById(id);
  if (!productId) return { type: 404, message: 'Product not found' };
  await productModel.deleteProducts(id);
  return { type: null, message: '' };
};

module.exports = {
  allProducts,
  productById,
  productRegistration,
  updateProducts,
  deleteProducts,
};