const productServices = require('../services/productService');

const allProducts = async (_req, res) => {
  const products = await productServices.allProducts();

  return res.status(200).json(products);
};

const productById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await productServices.productById(id);
  if (product.message) return res.status(404).json({ message: product.message });
  
  res.status(200).json(product);
};

const productRegistration = async (req, res) => {
  const name = req.body;
  const product = await productServices.productRegistration(name);
  const newProducts = { id: product, ...name };

  return res.status(201).json(newProducts);
};

const updateProducts = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const productUpdated = await productServices.updateProducts(id, name);
  const newObj = { id, name };
  if (!productUpdated) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(newObj);
};

const deleteProducts = async (req, res) => {
  const id = Number(req.params.id);
  const del = await productServices.deleteProducts(id);
    if (del.type) return res.status(del.type).json({ message: del.message });
  
  return res.status(204).send();
};

module.exports = {
  allProducts,
  productById,
  productRegistration,
  updateProducts,
  deleteProducts,
};