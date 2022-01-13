const Product = require('../models/productsSchema');
const Category = require('../models/categorySchema');


exports.productCount = async (req,res) => {

    const countProducts = await Product.countDocuments((count) => count)

    if(!countProducts) return res.status(500).json({isSuccess:false})

    res.send({countProducts})
}

exports.addProducts = async (req,res) => {
  
    try {
            
          const category = await Category.findById(req.body.category);

          req.body.category = category

          if(!req.body.category) return res.status(404).send('invalid Category')

        const products = await Product.create(req.body);

        res.status(200).json({
           isSuccess:true,
           data:products
       })

    } catch (error) {
         console.log(error)
       res.status(400).json({
           isSuccess:false,
           message:error
       })
      
    }

}


exports.getProducts = async (req,res) => {

    try {

        let filter = {}

        if(req.query.categories){
            filter = {category:req.query.categories.split(',')}
        }
           const products = await Product.find(filter).populate({
               path:'category',
               select:'name , -_id'
           });

           res.status(200).json({
               count:products.length,
               isSuccess:true,
               data:products
           })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }
exports.getProductsWhoFeatured = async (req,res) => {

    try {
           const count = req.params.count ? req.params.count : 0

        
                  const products = await Product.find({isFeatured:true}).limit(+count) 
       

           res.status(200).json({
               count:products.length,
               isSuccess:true,
               data:products
           })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }

 
exports.getOneProduct = async (req,res) => {

    try {
           const product = await Product.findById(req.params.productId)

           if(!product) return res.status(400).send('product not found')

           res.status(200).json({
               isSuccess:true,
               data:product
           })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }
 
exports.updateProduct = async (req,res) => {

    try {
           const product = await Product.findByIdAndUpdate(req.params.productId,req.body,{
               new:true,
               runValidators:true
           })

           res.status(200).json({
               isSuccess:true,
               data:product
           })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }
 
exports.deleteProduct = async (req,res) => {

    try {
           const product = await Product.findByIdAndDelete(req.params.productId)

           res.status(200).json({
               isSuccess:true,
               data:{}
           })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }


 exports.createProductByCategory = async (req,res) => {
      
        // api.v1/category/gdjvjfewfku5888/product
        
        try {
            req.body.category = req.params.categoryId
            const category = await Category.findById(req.params.categoryId)
            if(!category) return res.status(400).send('invalid category')
             
             const product = await Product.create(req.body)

             res.status(200).json({
                isSuccess:true,
                data:product
            })

            
        } catch (error) {
            res.status(400).json({
                isSuccess:false,
                message:error
            })
        }
 }

