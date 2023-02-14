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

const productRegistration = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

module.exports = {
  allProducts,
  productById,
  productRegistration,
};