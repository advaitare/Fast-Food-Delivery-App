const express = require('express');
const router = express.Router();

const {
  read,
  create,
  productById,
  update,
  remove,
  list,

  listCategories,
  listBySearch,
  photo,
  listSearch
} = require('../controllers/product');

const { userById } = require('../controllers/user');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

router.get('/product/:productId', read);
router.put(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  update
);
router.delete(
  '/product/:productId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);

router.get('/products', list);
router.get('/products/search', listSearch);

router.get('/products/categories', listCategories);
router.get('/product/photo/:productId', photo);

router.post('/products/by/search', listBySearch);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;
