const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const orderController = require('../controllers/order');

const router = express.Router();

router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);
router.delete('/orders/:id', orderController.deleteOrder);
router.put('/orders/:id/products', orderController.addProductToOrder);
router.put('/orders/:id/checkout', orderController.checkoutOrder);

module.exports = router;