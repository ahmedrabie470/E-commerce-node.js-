
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { addProductToCart, removeProductFromCart, updateQuantity, applyCoupon, getUserCart } = require("./cart.service"); 
const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo("admin"))
router.route("/").post(addProductToCart).put(updateQuantity).delete(removeProductFromCart).get(getUserCart)
router.post('/applyCoupon',applyCoupon)


module.exports = router;
