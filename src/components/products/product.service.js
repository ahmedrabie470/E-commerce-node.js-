const AppError = require('../../utils/AppError');
const factory = require('../Handlers/factory.handler');
const productModel = require ('./product.model')
const slugify = require('slugify')
const {catchAsyncError} = require('../../utils/catchAsyncError')



//add Product
exports.createProduct = factory.createOne(productModel)

//to get all Products
exports.getAllProducts =factory.getAll(productModel)

//to get specific Product 
exports.getSpecificProduct = factory.getSpecific(productModel)

//update Product
exports.updateProduct =catchAsyncError(async(req,res,next)=>{
    const { id } = req.params;
    if(req.body.name){

        req.body.name = slugify(req.body.name)
    }
    const product = await productModel.findByIdAndUpdate(id,
    req.body
    ,{new:true});
    !product && next(new AppError("Product not found" , 400))
    product &&  res.status(200).json({message:"Product updated " , product })
})

//to delete Product
exports.deleteProduct =factory.deleteOne(productModel)