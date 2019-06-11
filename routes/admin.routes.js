const Product = require('../models/product');

const router = require('express').Router();
//const path = require('path');
const adminController = require('../controllers/admin.controller'); 

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAppProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;