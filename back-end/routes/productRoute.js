const express = require('express');

const {addProducts,getProducts,getOneProduct,updateProduct,deleteProduct,
productCount,
getProductsWhoFeatured,
createProductByCategory
} = require('../controllers/productController');

const router = express.Router();

router
.route('/')
.get(getProducts)
.get(getProductsWhoFeatured)
.post(addProducts)

router
.route('/:productId')
.get(getOneProduct)
.put(updateProduct)
.delete(deleteProduct)


// create product by category
router
.route('/category/:categoryId/product')
.post(createProductByCategory)

// route statistic
router.get('/get/count',productCount)
router.get('/get/featured/:count',getProductsWhoFeatured)


// router
// .route('/:categoryId')
// .get(getOneCategory)
// .put(updateCategories)
// .delete(deleteCategories)





module.exports = router;