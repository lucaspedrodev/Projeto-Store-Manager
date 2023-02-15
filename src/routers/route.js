const express = require('express');
const productController = require('../controllers/productController');
const validation = require('../middlewares/validations');

const router = express.Router();

router.get('/products', productController.allProducts);

router.get('/products/:id', productController.productById);
router.post('/products', validation.validProduct, productController.productRegistration);

module.exports = router;