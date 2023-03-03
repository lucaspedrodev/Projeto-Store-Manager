const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();
  if (type) res.status(404).send({ message: 'Sale not found' });
  return res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesById(id);
  if (type === 404) {
    return res.status(404).json({
      message: 'Sale not found',
    });
  }
  return res.status(200).json(message);
};

// teste avaliador github
module.exports = {
  getSalesById,
  getAllSales,
   
};