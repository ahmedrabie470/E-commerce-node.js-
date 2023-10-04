const { createCategory, getCategory, updateCategory, getAllCategories, getSpecificCategory, deleteSpecificCategory } = require('./category.service')
const subcategoryRoute = require('../subcategory/subcategory.api')
const { ProtectedRoutes, allowedTo } = require('../user/user.auth')
const { uploadFile } = require('../Handlers/upload.handlers')
const router = require('express').Router()

router.use("/:categoryId/subcategories", subcategoryRoute)
router.route('/')
.post(ProtectedRoutes,allowedTo('admin'),uploadFile('image',"category"), createCategory)
.get(ProtectedRoutes, allowedTo('admin'),getAllCategories)
.post(ProtectedRoutes, allowedTo('admin'), uploadFile('image', 'category')),

router.route('/:id').get(getSpecificCategory).patch(ProtectedRoutes, allowedTo('admin'),updateCategory).delete(ProtectedRoutes, allowedTo('admin'),deleteSpecificCategory)
module.exports = router