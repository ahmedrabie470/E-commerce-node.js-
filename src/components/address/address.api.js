
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { addToAddress, removeFromAddress, getUserAddress} = require("./address.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo("user"))
router.route("/").patch(addToAddress)
    .delete(removeFromAddress)
    .get(getUserAddress)
module.exports = router;
