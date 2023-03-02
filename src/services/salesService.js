const salesModel = require('../models/salesModel');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();

  return { type: null, message: allSales };
};

const getSalesById = async (id) => {
  const sales = await salesModel.getSalesById(id);
  if (sales.length === 0) return { type: 404, message: 'Sale not found' };
  return { type: 200, message: sales };
};

module.exports = {
  getSalesById,
  getAllSales,
};