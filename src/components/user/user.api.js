// const { uploadMoreFile } = require('../Handlers/upload.handlers')
const { createUser, updateUser, deleteUser, getAllUsers, getSpecificUser, changePassword } = require('../user/user.service')
const {  signin, signup } = require('./user.auth')

const router = require ('express').Router()

router.route('/').post(createUser).get(getAllUsers)


router.route('/:id').get(getSpecificUser).put(updateUser).delete(deleteUser),
router.patch('/changePassword/:id',changePassword)
router.post('/signup',signup)
router.post('/signin',signin)

module.exports = router