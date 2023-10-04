const AppError = require('../../utils/AppError');
const subCategoryModel = require ('./subCategory.model')
const factory = require('../Handlers/factory.handler');
const slugify = require('slugify')
const {catchAsyncError} = require('../../utils/catchAsyncError')



//add subcategory
exports.createSubCategory = catchAsyncError(async(req,res)=>{
    const {name , category} = req.body
    const subcategory = new subCategoryModel({name , slug:slugify(name) , category})
    await subcategory.save()
    res.status(200).json(subcategory)
})


//to get all subcategory
exports.getAllSubcategories = catchAsyncError (async (req,res)=>{
    let filter = {}
    if(req.params.categoryId)
    {
        filter = {categoryId : req.params.categoryId}
    }
    let subcategory = await subCategoryModel.find(filter).populate('categoryId' , 'name -_id')
    res.status(200).json({message:"success" ,subcategory})
})

  
//to get specific subcategory 
exports.getSpecificSubcategory = factory.getSpecific(subCategoryModel)


// to update specific subcategory
exports.updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, categoryId } = req.body;
    let subcategory = await subCategoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
        categoryId,
      },
      { new: true }
    );
  
    if (!subcategory) {
      return next(new AppError("Category not found", 400));
    }
    res.status(200).json(subcategory);
  });
  
  // to delete specific subcategory
  exports.deleteSubCategory = factory.deleteOne(subCategoryModel)
  
  
  