const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

  name:{
      type:String,
      required:true,
      trim:true
  },
  email:{
    type: String, 
    unique:true,
    required:true
  },
   password:{
      type:String,
      maxLenth:8,
      required:true
  },
   phone:{
      type:String,
      required:true
  },
  isAdmin:{
      type:Boolean,
      default:false
  },
  street:{
      type:String,
      default:''
  },
  apartment:{
      type:String,
       default:''
  },
   zip:{
      type:String,
       default:''
  },
   city:{
      type:String,
       default:''
  },
   country:{
      type:String,
       default:'' 
  },
  
},{
  timestamps:true
})

userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()

})

userSchema.methods.matchPassword = async function(currentPassword){
    
    return  await bcrypt.compare(currentPassword,this.password)

}

userSchema.methods.getSignedToken = function(){

    return jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE}
    );
}


module.exports = mongoose.model('User',userSchema);