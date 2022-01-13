const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const asyncHandler = require('express-async-handler')



 exports.protect = asyncHandler(async(req,res,next) => {

     let token;
   
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1]
       console.log(token)
       }

      if(!token){
          res.status(401)
          throw new Error('not authorize')
        }  
    
       try {
         //  verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)

         req.user = await User.findById(decoded.id)
         next()

         if(!req.user){
             res.status(401)
             throw new Error('user not accessib to this token')
         }

    } catch (error) {
        console.log(error)
    }

 })


exports.Signup = async (req,res) => {

    try {
         const {email} = req.body
          
         let user = await User.findOne({email}).select('+password')
         
          if(user) return res.status(401).send('user is exit , create an account')
          
         const users  = await User.create(req.body)

         const token = users.getSignedToken();

         if(!token) return res.send('invalid token')

           res.status(200).json({
               isSuccess:true,
               data:users,
               token
           })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }

exports.SignIn = async (req,res) => {

    try {

        const {email,password} = req.body

        if(!email || !password) return res.status(400).send('invalid creditentials')
          
         const user  = await User.findOne({email}).select('+password')

         if(!user) return res.status(400).send('invalid creditentials')

         const isMatch = await user.matchPassword(password)

         if(!isMatch) return res.status(400).send('invalid creditentials')

         const token = user.getSignedToken();

         if(!token) return res.send('invalid token')

          if(user){
              return res.status(200).json({
               isSuccess:true,
               user:user.email,
               token
           })
          }
           
    } catch (error) {
        console.log(error)
        res.status(400).json({
            isSuccess:false,
            message:error
        })
    }
  
 }

 exports.authorize = (...roles) => {
     return (req,res,next)=> {
     if(!roles.includes(req.user.isAdmin)){
         return res.send('not permission')
     }
         next()
     }
 }
