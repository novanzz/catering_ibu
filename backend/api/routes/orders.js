const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

const OrdersController = require('../controllers/orders');

router.get('/',checkAuth,OrdersController.order_get_all);
router.post('/',OrdersController.order_post_all);
router.delete('/:orderId',checkAuth,OrdersController.order_delete_orderId);
router.get('/:orderId',checkAuth,OrdersController.order_get_orderId);

module.exports = router;