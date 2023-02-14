const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/products', productController.allProducts);

router.get('/products/:id', productController.productById);
router.post('/products', productController.productRegistration);

module.exports = router;