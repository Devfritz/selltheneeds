const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({

  name:{
      type:String,
      required:true,
      trim:true,
      maxlength:30
  },
  color:{
    type: String, 
    required:true
  },

   icon:{
      type:String,
      required:true
  },
   imageBackground:{
      type:String
  },
  
},{
  timestamps:true
})


module.exports = mongoose.model('Category',categorySchema);