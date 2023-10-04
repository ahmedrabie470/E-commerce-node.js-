const {model , Schema , Types} = require ("mongoose")

const schema = Schema({
    name:{
        type:String,
        // required:[true , 'categoryId required '],
        trim:true,
        unique:[true, 'product must be name unique'],
        minlength:[2 ,'too short product name']

    },
    slug:{
        type:String,
        lowercase:true,

    },
    ImageCover:String ,
    Images:[String],
    description:{
        type:String,
        // required:[true , 'you must enter product description '],
        minlength:[ 15 ,'too short product name'],
        trim:true,

    },
    quantity:{
        type:Number,
        // // required:[true , 'product quantity required '],
        default:0

    },
    colors:[String],

    price:{
        type:Number,
        // // required:[true , 'price required '],

    },
    priceAfterDiscount:{
        type:Number,
        // // required:[true , 'priceAfterDiscount required '],

    },
    sold:{
        type:Number,
        // // required:[true , 'sold required '],
        default:0
    },
    categoryId:{
        type:Types.ObjectId,
        ref:"category",
        // // required:[true , 'categoryId required '],

    },
    subCategoryId:{
        type:Types.ObjectId,
        ref:"subCategory",
        // // required:[true , 'subCategoryId required '],

    },
    brandId:{
        type:Types.ObjectId,
        ref:"brands",
        // // required:[true , 'brandId required '],
    },
    averageRating:{
        type:Number,
        min:[1,'rate must be greater than 1'],
        max:[5,'rate must be greater than 5']
    },
    ratingCount:{
        type:Number,
        default:0
    }

},
{timestamps:true,
toJSON:{virtuals:true},
toObject:{virtuals:true}
});



schema.virtual('reviews',{
    ref:'review',
    localField:'_id',
    foreignField:'product'
})


schema.pre(/^find/, function(){
    this.populate([{
        path:"reviews",
        select:"user",
        option:{limit:1}

    }])
})



schema.post('init',(doc)=>{
   if(doc.ImageCover&& doc.Images){
    let imgs = []
    doc.ImageCover="http://localhost:3000/product/"+doc.ImageCover,
    doc.Images.forEach((elem)=>{
     imgs.push("http://localhost:3000/product/"+elem)
    })
    doc.Images=imgs
   }
})
module.exports=model('product' , schema)



