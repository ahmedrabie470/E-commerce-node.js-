const {model , Schema , Types} = require ("mongoose")

const schema = Schema({
    name:{
        type:String,
        required:[true , 'you must enter subCategory name '],
        trim:true,
        unique:[true, 'subCategory name unique'],
        minlength:[2 ,'too short subCategory name']

    },
    slug:{
        type:String,
        lowercase:true,

    },
    categoryId:{
        type:Types.ObjectId,
        ref:'category'
    }

},{timestamps:true})

module.exports=model('subCategory' , schema)



