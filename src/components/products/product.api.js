const { uploadMoreFile } = require('../Handlers/upload.handlers')
const { createProduct, updateProduct, deleteProduct, getAllProducts, getSpecificProduct } = require('../products/product.service')

const router = require ('express').Router()

router.route('/').post(uploadMoreFile([{ name: 'ImageCover', maxCount: 1 }, { name: 'Images', maxCount: 3 }],'products'),createProduct).get(getAllProducts)


router.route('/:id').get(getSpecificProduct).put(updateProduct).delete(deleteProduct)

module.exports = router