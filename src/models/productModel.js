const connection = require('./connection');

const allProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [results] = await connection.execute(query);
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

const updateProducts = async (id, name) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  const [{ affectedRows }] = await connection.execute(query, [name, id]);
  return affectedRows;
};

const deleteProducts = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = {
  allProducts,
  productById,
  productRegistration,
  updateProducts,
  deleteProducts,
};