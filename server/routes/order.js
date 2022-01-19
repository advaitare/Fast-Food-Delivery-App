const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const {
  orderById,
  create,
  getOrders,
  getStatusValues,
  updateOrderStatus
} = require('../controllers/order');


router.post(
  '/order/create/:userId',
  requireSignin,
  isAuth,
  addOrderToUserHistory,

  create
);

router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, getOrders);
router.get(
  '/order/status-values/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  getStatusValues
);
router.put(
  '/order/:orderId/status/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  updateOrderStatus
);

router.param('userId', userById);
router.param('orderId', orderById);
module.exports = router;
