const connection = require('./connection');

const allProducts = async () => {
  const querys = 'SELECT * FROM StoreManager.products';
  const [results] = await connection.execute(querys);
  return results;
};

const productById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
  const [[result]] = await connection.execute(query, [id]);
  return result;
};

module.exports = {
  allProducts,
  productById,
};