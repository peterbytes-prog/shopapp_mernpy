const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;


const Schema = mongoose.Schema;
const ImageSchema = new Schema({ path:{
                                        type:String,
                                      }
                                });
const ProductSchema = new Schema(
  {
    images:[ImageSchema],
    description: {
      type: String,
      required: [true, "Product Description is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price:{
      type: Currency,
      required: [true, "Product price is required"],
    }
  },{
    timestamps:true
  }
);

var Product = mongoose.model('Product', ProductSchema, 'Shop');
exports.Product = Product;

const ProductDealSchema = new Schema({
  product:{
    type: Schema.Types.ObjectsId,
    ref: "Product"
  },
  price:{
    type: Currency,
    required: [true, "Product Deal price is required"],
  }
},
{
  timestamps:true
}
);

var ProductDeal = mongoose.model('ProductDeal', ProductDealSchema, 'Shop');
exports.ProductDeal = ProductDeal;
