const {model , Schema , Types} = require ("mongoose")

const schema = Schema({
    name:{
        type:String,
        required:[true , 'you must enter category name '],
        trim:true,
        unique:[true, 'category name unique'],
        minlength:[2 ,'too short category name']

    },
    slug:{
        type:String,
        lowercase:true,
        unique:[true, 'category slug unique']
    },
    image:{
        type:String 
    }

},{timestamps:true})
schema.post('init',(doc)=>{
    doc.image ='http://localhost:3000/brand/'+doc.image
})

module.exports=model('category',schema)

