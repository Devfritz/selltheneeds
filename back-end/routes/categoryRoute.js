const express = require('express');

const {
  getCategories,
  addCategories,
  updateCategories,
  getOneCategory,
  deleteCategories,
} = require('../controllers/categoryController');

const { protect, authorize } = require('../controllers/auth');
const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, authorize('isAdmin'), addCategories);

router
  .route('/:categoryId')
  .get(getOneCategory)
  .put(protect, updateCategories)
  .delete(deleteCategories);

module.exports = router;
