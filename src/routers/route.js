const express = require('express');
const productController = require('../controllers/productController');
const { validProduct } = require('../middlewares/validations');

const router = express.Router();

router.get('/', productController.allProducts);

router.get('/:id', productController.productById);
router.post('/', validProduct, productController.productRegistration);
router.post('/sales');
router.put('/:id', validProduct, productController.updateProducts);
router.delete('/:id', productController.deleteProducts);
module.exports = router;