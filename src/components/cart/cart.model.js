const {model , Schema, Types} = require ("mongoose")

const schema = Schema({
    cartItems : [
       { product:
            {
                type:Types.ObjectId,
                ref:"product"
            }
        ,
        quantity:
            {
                type:Number,
                default:1
            },
            price:Number
        }
            
    ],
    user:{
        type:Types.ObjectId,
        ref:'user'
    },
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    discount:Number,
},{timestamps:true})

module.exports=model('cart' , schema)



