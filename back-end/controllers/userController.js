const User = require('../models/userSchema');


   exports.getAllUsers = async (req,res) => {
    try {
        const user = await User.find().select('-password')

        res.status(200).json({
            isSuccess:true,
            data:user
        })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
   
    
   }

exports.getOneUser = async (req,res) => {

    try {
        const user = await User.findById(req.params.userId);

        if(!user) {
            res.status(404).json({
                isSuccess:false,
                message:error
            })
        }

        res.status(200).json({
            isSuccess:true,
            data:user
        })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
   
     

}

exports.updateUser = async (req,res) => {
    try {
        
        const user = await User.findByIdAndUpdate(req.params.UserId , req.body ,{
            new:true,
            runValidators:true
        });

          if(!user) {
            res.status(404).json({
                isSuccess:false,
                message:error
        })
          }
        res.status(200).json({
            isSuccess:true,
            data:user
        })
    } catch (error) {
        res.status(400).json({
            isSuccess:false,
            message:error
    })
}

}
exports.deleteUser = async (req,res) => {
    try {
        
        const user = await User.findByIdAndDelete(req.params.userId);

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