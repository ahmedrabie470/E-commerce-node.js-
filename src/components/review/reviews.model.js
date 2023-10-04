const {model , Schema , Types} = require ("mongoose")

const schema = Schema({
    title:{
        type:String,
        required:[true , 'you must enter review name '],
        trim:true,
        unique:[true, 'review name unique'],
        minlength:[2 ,'too short review name'],

    },
    user:{
        type:Types.ObjectId,
        ref:"user"
    },
    product:{
        type:Types.ObjectId,
        ref:"product"
    },
    rateAvg:{
        type:Number,
        min:[1,'rate must be greater than 1'],
        max:[5,'rate must be less than 5']
    }

},{timestamps:true})



module.exports=model('review' , schema)



