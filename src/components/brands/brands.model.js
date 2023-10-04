const {model , Schema } = require ("mongoose")

const schema = Schema({
    name:{
        type:String,
        required:[true , 'you must enter brand name '],
        trim:true,
        unique:[true, 'brand name unique'],
        minlength:[2 ,'too short brand name']

    },
    slug:{
        type:String,
        lowercase:true,

    },
    image:String

},{timestamps:true})
    
schema.post('init',(doc)=>{
    doc.image="http://localhost:3000/brand/"+doc.image
})



module.exports=model('brand',schema)



