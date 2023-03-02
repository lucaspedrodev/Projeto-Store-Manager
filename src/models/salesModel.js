const connection = require('./connection');

const getAllSales = async () => {
  const query = `SELECT sal.id AS saleId, sal.date, pro.product_id AS productId, pro.quantity 
  FROM StoreManager.sales_products AS pro LEFT JOIN StoreManager.sales AS sal 
  ON sal.id = pro.sale_id`;
  const [result] = await connection.execute(query);

  return result;
};

const getSalesById = async (id) => {
  const query = `SELECT sal.date, sp.product_id AS productId, sp.quantity FROM 
  StoreManager.sales_products AS sp LEFT JOIN StoreManager.sales AS sal ON sal.id
  = sp.sale_id WHERE sal.id = ${id} ORDER BY sal.id, sp.product_id ASC`;
  const [result] = await connection.execute(query);
  return result;
};

// const insertSales = async (newSale) => {
//   const querySale = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
//   const [{ insertId }] = await connection.execute(querySale);

//   const querySaleProduct = `INSERT INTO StoreManager.sales_products
//     (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
//    const sales = await Promise.all(newSale.map(async (element) => {
//     await connection.execute(querySaleProduct, [insertId, element.productId, element.quantity]);
//     return element;
//    }));
  
//   const result = {
//     id: insertId,
//     itemsSold: sales,
//   };
//   return result;
// };

// const getAllSales = async () => {
//   const query = `SELECT sale_id AS saleId, s.date AS date, product_id AS productId, quantity 
//   FROM StoreManager.sales_products AS sp 
//   INNER JOIN StoreManager.sales AS s
//   ON sp.sale_id = s.id ORDER BY sale_id,product_id`;
//   const [getSales] = await connection.execute(query);
//   return getSales;
// };

// const findProductIdSales = async (id) => {
//   const prodId = id.map((item) => item.productId);
//   const idMap = prodId.map((_) => '?').join(', ');
//   const query = `SELECT * FROM StoreManager.products WHERE id IN (${idMap})`;
//   const [result] = await connection.execute(query, prodId);
//     return result;
// };

module.exports = {
  getSalesById,
  getAllSales,
  
};