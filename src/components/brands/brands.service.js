const brandsModel = require ('./brands.model')
const factory = require('../Handlers/factory.handler');


//add brands
exports.createBrands =factory.createOne(brandsModel)


//to get all brands
exports.getAllBrands = factory.getAll(brandsModel)

//to get specific brands 
exports.getSpecificBrands =factory.getSpecific(brandsModel)



//update brands
exports.updateBrands =factory.updateOne(brandsModel)

//to delete specific brands
exports.deleteBrands=factory.deleteOne(brandsModel)