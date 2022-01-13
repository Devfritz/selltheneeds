const mongoose = require('mongoose');


const orderItemsSchema = new mongoose.Schema({

   quantity:{
      type:Number,
      required:true,
  },
   product:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Product'
   }
},{
  timestamps:true
})


module.exports = mongoose.model('OrderItem',orderItemsSchema);