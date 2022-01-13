const mongoose = require('mongoose');
const slugify = require('slugify');


const orderSchema = new mongoose.Schema({

  orderItems:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'OrderItem',
      required:true
  }],

    shippingAddress1:{
      type:String,
      required:true
  },
    shippingAddress2:{
      type:String,
      required:true
  },
   city:{
     type:String,
      required:true
   },
   zip:{
     type:String,
      required:true
   },
   country: {
     type:String,
      required:true
   },
   phone: {
     type:String,
      required:true
   },
   status: {
     type:String,
      required:true,
      default:'Pending'
   },
  totalPrice:{
     type:Number,
     default:0
  }, 
  user:{
    type : mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },

},{
  timestamps:true
})

productSchema.pre('save',function(next) {

  this.slug = slugify(this.name,{lower:true});

     next()
})

module.exports = mongoose.model('Order',orderSchema);