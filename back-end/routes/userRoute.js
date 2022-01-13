const express = require('express');

const {getAllUsers,getOneUser,updateUser,deleteUser} = require('../controllers/userController')

// authentification 
const {protect,Signup,SignIn,authorize} = require('../controllers/auth')

const router = express.Router();


router
.route('/users')
.get(protect,getAllUsers)

router
.route('/user/:userId')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

router
.route('/auth/signup')
.post(Signup)

router
.route('/auth/sign-in')
.post(SignIn)








module.exports = router;