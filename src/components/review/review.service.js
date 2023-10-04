const AppError = require('../../utils/AppError');
const factory = require('../Handlers/factory.handler');
const {catchAsyncError} = require('../../utils/catchAsyncError');
const reviewsModel = require('./reviews.model');


//add Review
exports.createReview=catchAsyncError (async(req,res,next)=>{

    let isReview = await reviewsModel.findOne({user:req.user._id , product:req.body.product})
    if(isReview) next (new AppError("you are create a review before" , 400))

    let Review = new reviewsModel(req.body);
    await Review.save(Review)
    res.status(201).json(Review)
})

// //to get all Reviews
exports.getAllReviews =factory.getAll(reviewsModel)

//to get specificReview
exports.getSpecificReview = factory.getSpecific(reviewsModel)

//update Review

exports.updateReview = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;
    const review = await reviewsModel.findById(id);

    
    if(review.user.toString() == req.user._id.toString()){
        
        let Review = await reviewsModel.findByIdAndUpdate(id, req.body, { new: true });
        !Review && next(new AppError("Review not found", 400));
        Review && res.status(200).json(Review);
   
    }
    else{
        next(new AppError("you are not the owner of this review", 400))
    }

    

});

//to delete Review
exports.deleteReview =factory.deleteOne(reviewsModel)