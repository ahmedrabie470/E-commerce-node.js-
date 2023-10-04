const AppError = require('../../utils/AppError');
const factory = require('../Handlers/factory.handler');
const {catchAsyncError} = require('../../utils/catchAsyncError');
const cartModel = require('./cart.model');
const productModel = require('../products/product.model');
const couponModel = require('../coupon/coupon.model');
//calc total price 
calcTotalPrice =(cart)=>{
    let  totalPrice = 0 ; 
    cart.cartItems.forEach((item) =>  
    totalPrice += item.price * item.quantity
    )
    cart.totalPrice = totalPrice
    if (cart.totalPriceAfterDiscount) {
        cart.totalPriceAfterDiscount =
            (cart.totalPrice - (cart.totalPrice * cart.discount) / 100).toFixed(2)
        console.log(cart.discount);
    }else{
        cart.discount=0
    }
}

//add product to  cart
exports.addProductToCart=catchAsyncError (async(req,res,next)=>{
    let {price} = await productModel.findById(req.body.product)
    req.body.price = price

    let cart = await cartModel.findOne({user:req.user._id})//.populate('cartItems.product' , 'price')
    if(!cart){
        let newCart =  new cartModel ({
            cartItems:[req.body],
            user:req.user._id
        });
        calcTotalPrice(newCart)
        await newCart.save()
        res.status(200).json({message:"cart created successfully "},newCart)
    }else{
        let findProduct = cart.cartItems.find((item) => item.product == req.body.product)
        if(findProduct){
            findProduct.quantity += 1 
        }else{
           cart.cartItems.push(req.body)
        }
        calcTotalPrice(cart)
        await cart.save()
        res.status(200).json(cart)

    }
})


// remove product from cart 

exports.removeProductFromCart = catchAsyncError(async (req, res, next) => {
    let cart= await cartModel.findOneAndUpdate({user :req.user._id}, {
        $pull: { cartItems: {_id:req.body.itemId} }
    }, { new: true });
        calcTotalPrice(cart)
        await cart.save()
    !cart && next(new AppError("this Item not found", 400));
    cart && res.status(200).json(cart);
});


// update quantity 
exports.updateQuantity =catchAsyncError (async(req,res,next)=>{
    let cart = await cartModel.findOne({user:req.user._id})
        let findProduct = cart.cartItems.find((item) => item.product == req.body.product)
        if(!findProduct) return next(new AppError("this product not found" , 404))
        if(findProduct){
            findProduct.quantity = req.body.quantity 
        }
        calcTotalPrice(cart)
        await cart.save()
        res.status(200).json(cart)

    
})

//apply coupon
exports.applyCoupon = catchAsyncError(async (req, res, next) => {
    let { code, discount } = await couponModel.findOne({ code: req.body.code })
    if (!code) return next(new AppError('coupon not found or expired'))
    let cart = await cartModel.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = (cart.totalPrice - (cart.totalPrice * discount) / 100).toFixed(2)
    cart.discount = discount
    await cart.save()
    res.status(200).json({ cart })
});

//get user cart
exports.getUserCart = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id });
    !cart && next(new AppError("cart not found", 400));
    cart && res.status(200).json({ count: cart.cartItems.length, cart });
});
