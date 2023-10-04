const AppError = require('../../utils/AppError');
const userModel = require ('./user.model')
const {catchAsyncError} = require('../../utils/catchAsyncError')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//signup
exports.signup=catchAsyncError (async(req,res,next)=>{
    let isUser = await userModel.findOne({email:req.body.email}) ;
    if(isUser) return next(new AppError('email already exist' , 401) )

    let user = new userModel(req.body);
    await user.save(user)
    res.status(201).json({message:"success", user})
    console.log(user);
})


//signin
exports.signin=catchAsyncError (async(req,res,next)=>{
    let User = await userModel.findOne({email:req.body.email}) ;
    if(!User || !await bcrypt.compare(req.body.password,User.password))
    return next(new AppError('Incorrect email or password' , 401) )

    let token = jwt.sign({userId:User._id , name:User.name},process.env.JWT_SECRET)
    // let user = new userModel(req.body);
    // await user.save(user)
    res.status(201).json({message:"sign in successfuly", token})
})


//to protect endPoint

exports.ProtectedRoutes = catchAsyncError(async (req, res, next) => {
    let token = req.headers.token;
    if (!token) return next(new AppError("token not provided", 401));
  
    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
    let user = await userModel.findById(decoded.userId);
    if (!user) return next(new AppError("User Not Found", 401));
  
    if (user.passwordChangedAt) {
      let changePassword = parseInt(user.passwordChangedAt.getTime() / 1000);
      if (changePassword > decoded.iat)
        return next(new AppError("password changed", 401));
    }
  
  
    req.user = user;
  
    next();
  });

//to authorization 

exports.allowedTo =  (...roles) => {
    return catchAsyncError (async (req,res,next)=>{
       
        if(!roles.includes(req.user.role))
        return  next(new AppError("you are not authorized to access this route",401))
        next()

    })
}