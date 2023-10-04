const { uploadFile } = require('../Handlers/upload.handlers')
const { createBrands, getAllSubcategories, getSpecificBrands, updateBrands, deleteBrands, getAllBrands } = require('./brands.service')

const router = require ('express').Router({mergeParams: true})

router.route('/').post(uploadFile('image','category'),createBrands).get(getAllBrands)


router.route('/:id').get(getSpecificBrands).put(uploadFile('image','category'),updateBrands).delete(deleteBrands)

module.exports = router