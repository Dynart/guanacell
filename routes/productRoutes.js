const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

router.get('/', auth, productController.getProducts); // Requiere autenticación
router.post('/', [auth, admin], productController.createProduct); // Requiere autenticación y rol admin
router.put('/:id', [auth, admin], productController.updateProduct); // Requiere autenticación y rol admin
router.delete('/:id', [auth, admin], productController.deleteProduct); // Requiere autenticación y rol admin

module.exports = router;