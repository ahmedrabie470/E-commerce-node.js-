const AppError = require('../../utils/AppError');
const factory = require('../Handlers/factory.handler');
const {catchAsyncError} = require('../../utils/catchAsyncError');
const couponModel = require('./coupon.model');


//add coupon
exports.createCoupon=catchAsyncError (async(req,res,next)=>{
    let coupon = new couponModel(req.body);
    await coupon.save()
    res.status(201).json(coupon)
})

// //to get all coupons
exports.getAllCoupons =factory.getAll(couponModel)

//to get specificCoupon
exports.getSpecificCoupon = factory.getSpecific(couponModel)

//update coupon

exports.updateCoupon = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
        let coupon = await couponModel.findByIdAndUpdate(id, req.body, { new: true });
        !coupon && next(new AppError("coupon not found", 400));
        coupon && res.status(200).json(coupon);
});
//to delete coupon
exports.deleteCoupon =factory.deleteOne(couponModel)