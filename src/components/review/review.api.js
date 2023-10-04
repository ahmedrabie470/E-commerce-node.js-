const { allowedTo, ProtectedRoutes } = require('../user/user.auth')
const { createReview,getSpecificReview, updateReview, deleteReview,  } = require('./review.service')
const {getAllReviews} = require('./review.service')

const router = require ('express').Router({mergeParams: true})

router.route('/').post(ProtectedRoutes,allowedTo("admin"),createReview).get(getAllReviews)


router.route('/:id').get(getSpecificReview).put(ProtectedRoutes,allowedTo('admin','user'),updateReview).delete(ProtectedRoutes,allowedTo('admin','user'),deleteReview)

module.exports = router
