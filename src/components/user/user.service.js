const AppError = require('../../utils/AppError');
const factory = require('../Handlers/factory.handler');
const userModel = require ('./user.model')
const slugify = require('slugify')
const {catchAsyncError} = require('../../utils/catchAsyncError')


//add user
exports.createUser=catchAsyncError (async(req,res,next)=>{
    let isUser = await userModel.findOne({email:req.body.email}) ;
    if(isUser) return next(new AppError('email already exist' , 401) )

    let user = new userModel(req.body);
    await user.save(user)
    res.status(201).json({message:"user created ", user})
})

// //to get all users
exports.getAllUsers =factory.getAll(userModel)

//to get specific user 
exports.getSpecificUser = factory.getSpecific(userModel)

//update user
exports.updateUser =catchAsyncError(async(req,res,next)=>{
    const { id } = req.params;
    if(req.body.name){
        req.body.name = slugify(req.body.name)
    }
    const user = await userModel.findByIdAndUpdate(id,req.body,{new:true});
    !user && next(new AppError("user not found" , 400))
     user &&  res.status(200).json({message:"user updated " , user })
})


//change admin password 
exports.changePassword  =catchAsyncError(async(req,res,next)=>{
    const { id } = req.params;
   req.body.passwordChangeAt=Date.now()
    if(req.body.name){
        req.body.name = slugify(req.body.name)
    }
    const user = await userModel.findByIdAndUpdate(id,req.body,{new:true});
    !user && next(new AppError("user not found" , 400))
     user &&  res.status(200).json({message:"user updated " , user })
})

//to delete user
exports.deleteUser =factory.deleteOne(userModel)