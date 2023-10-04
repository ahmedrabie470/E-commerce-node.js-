


exports.allRequires=(app)=>{

    app.use("/api/v1/categories",require("../components/category/category.api"));
    app.use("/api/v1/subcategories",require("../components/subcategory/subcategory.api"));
    app.use('/api/v1/brand',require('../components/brands/brands.api'))
    app.use('/api/v1/products',require('../components/products/product.api'))
    app.use('/api/v1/user',require('../components/user/user.api'))
    app.use('/api/v1/reviews',require('../components/review/review.api'))
    app.use('/api/v1/wishlist',require('../components/wishlist/wishlist.api'))
    app.use('/api/v1/addresses',require('../components/address/address.api'))
    app.use('/api/v1/coupons',require('../components/coupon/coupon.api'))
    app.use('/api/v1/carts',require('../components/cart/cart.api'))


    
    

}    
