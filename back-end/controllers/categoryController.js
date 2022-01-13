const Category = require('../models/categorySchema');

exports.getCategories = async (req,res) => {

    try {
           const categories = await Category.find();

           res.status(200).json({
               isSuccess:true,
               data:categories
           })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }

exports.getOneCategory = async (req,res) => {

    try {
        const category = await Category.findById(req.params.categoryId);

        if(!category) {
            res.status(404).json({
                isSuccess:false,
                message:error
            })
        }

        res.status(200).json({
            isSuccess:true,
            data:category
        })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
   
     

}

exports.addCategories = async (req,res) => {
  
     try {
         const categories = await Category.create(req.body);
         res.status(200).json({
            isSuccess:true,
            data:categories
        })

     } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
     }

}

exports.updateCategories = async (req,res) => {
    try {
        
        const categories = await Category.findByIdAndUpdate(req.params.categoryId , req.body ,{
            new:true,
            runValidators:true
        });

          if(!categories) {
            res.status(404).json({
                isSuccess:false,
                message:error
        })
          }
        res.status(200).json({
            isSuccess:true,
            data:categories
        })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
    })
}

}
exports.deleteCategories =async (req,res) => {
    try {
        
        const categories = await Category.findByIdAndDelete(req.params.categoryId);

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