const AppError = require('../../utils/AppError');
const CategoryModel = require ('./category.model')
const factory = require('../Handlers/factory.handler');
const slugify = require('slugify')
const {catchAsyncError} = require('../../utils/catchAsyncError')



//add category
exports.createCategory = factory.createOne(CategoryModel)

//to get all categories
exports.getAllCategories = catchAsyncError(async (req, res) => {
  let categories = await CategoryModel.find({});
  res.status(200).json(categories);
});


//to get specific category 
exports.getSpecificCategory = factory.getSpecific(CategoryModel)


//update category
exports.updateCategory =factory.updateOne(CategoryModel)

//to delete specific category
exports.deleteSpecificCategory=factory.deleteOne(CategoryModel)




