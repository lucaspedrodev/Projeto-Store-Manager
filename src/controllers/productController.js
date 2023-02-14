const productServices = require('../services/productService');

const allProducts = async (_req, res) => {
  const products = await productServices.allProducts();

  return res.status(200).json(products);
};

const productById = async (req, res) => {
  const id = Number(req.params.id);
  const product = await productServices.productById(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

module.exports = {
  allProducts,
  productById,
};