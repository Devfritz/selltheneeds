const mongoose = require('mongoose');
const slugify = require('slugify');


const productSchema = new mongoose.Schema({

  name:{
      type:String,
      required:true,
      trim:true,
      maxlength:30
  },
  slug:String,

   description:{
      type:String,
      required:true
  },
   richDescription:{
      type:String,
      default:''
  },
  imageUrl:{
      type:String,
      required:true
  },
  images:[{
    type:String,
  }],
  brand:{
      type:String,
      default:''
  },
  price:{
     type:Number,
     default:0
  },
  category:{
    type : mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:[true,'category est obligatoire']
  },
  countInStock:{
    type:Number,
    required:true,
    min:0,
    max:255
  },
  rating:{
    type:Number,
     default:0
  },
  numReviews:{
    type:Number,
    default:0
  },
   isFeatured:{
     type:Boolean,
     default:false
   },
 
},{
  timestamps:true
})

productSchema.pre('save',function(next) {

  this.slug = slugify(this.name,{lower:true});

     next()
})

module.exports = mongoose.model('Product',productSchema);