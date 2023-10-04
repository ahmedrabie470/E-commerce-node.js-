
const { ProtectedRoutes, allowedTo } = require("../user/user.auth");
const { createCoupon, deleteCoupon, getAllCoupons, updateCoupon, getSpecificCoupon } = require("./coupon.service");

const router = require("express").Router();
router.use(ProtectedRoutes, allowedTo("admin"))
router.route("/").post(createCoupon).get(getAllCoupons)
router.route("/:id")
.get(getSpecificCoupon)
.put(updateCoupon)
.delete(deleteCoupon)


module.exports = router;
