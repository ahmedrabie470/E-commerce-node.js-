const UserModel = require("../user/user.model");
const AppError = require("../../utils/AppError");
const { catchAsyncError } = require("../../utils/catchAsyncError");


exports.addToAddress = catchAsyncError(async (req, res, next) => {
    let { addresses } = await UserModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { addresses: req.body }
    }, { new: true })
    !addresses && next(new AppError("address not found", 400));
    addresses && res.status(200).json(addresses);
});

exports.removeFromAddress = catchAsyncError(async (req, res, next) => {
    let { addresses } = await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { addresses: {_id:req.body.address} }
    }, { new: true });
    !addresses && next(new AppError("addresses not found", 400));
    addresses && res.status(200).json(addresses);
});

exports.getUserAddress = catchAsyncError(async (req, res, next) => {

    let { addresses } = await UserModel.findById(req.user._id)
    !addresses && next(new AppError("addresses not found", 400));
    addresses && res.status(200).json(addresses);
});




