const router = require('express').Router();
const productsController = require('../controllers/shop.controller');

router.get('/', productsController.getIndex);
router.get('/products', productsController.getProducts);
router.get('/cart', productsController.getCart);
router.post('/cart', productsController.postCart)
router.get('/checkout', productsController.getCheckout);
router.get('/orders', productsController.getOrders);
router.get('/products/:productId', productsController.getProduct);
router.get('/products/delete');
router.post('/cart-delete-item', productsController.postCartDelete);

module.exports = router;