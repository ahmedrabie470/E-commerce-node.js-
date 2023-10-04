const { ProtectedRoutes, allowedTo } = require('../user/user.auth')
const { createSubCategory, getAllSubcategories, getSpecificSubcategory, updateSubCategory, deleteSubCategory } = require('./subCategory.service')


//merge params to merge categoryId with subCategory to get all subCategory of one category
const router = require ('express').Router({mergeParams: true})

router.route('/')
.post(ProtectedRoutes,allowedTo('admin'),createSubCategory)
.get(getAllSubcategories)

router.route('/:id')
.get(ProtectedRoutes,allowedTo('admin'),getSpecificSubcategory)
.put(ProtectedRoutes,allowedTo('admin'),updateSubCategory)
.delete(ProtectedRoutes,allowedTo('admin'),deleteSubCategory)

module.exports = router