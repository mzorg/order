const express = require('express');

const isAuth = require('../middleware/is-authenticated');
const authorize = require('../middleware/authorize');
const orderController = require('../controllers/order');

const router = express.Router();

router.get('/orders', [isAuth, authorize(['Admin'])], orderController.getOrders);
router.post('/orders', isAuth, orderController.createOrder);
router.delete('/orders/:id', [isAuth, authorize(['Admin', 'Owner'])], orderController.deleteOrder);
router.put('/orders/:id/products', [isAuth, authorize(['Admin', 'Owner'])], orderController.addProductToOrder);
router.put('/orders/:id/checkout', [isAuth, authorize(['Admin', 'Owner'])], orderController.checkoutOrder);

module.exports = router;