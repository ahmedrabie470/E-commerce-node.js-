const {model , Schema , Types} = require ("mongoose")
const bcrypt = require('bcrypt');

const schema = Schema({
    name:{
        type:String,
        required:[true , 'you must enter your name '],
        trim:true,
        unique:[true, ' name must be unique'],
        minlength:[2 ,'too short  name']

    },
    wishlist: [{ type: Types.ObjectId, ref: 'product' }],
    addresses: [{ 
        name:String,
        phone:Number,
        city:String,
        street:String, 
     }],

    profileImage:{
        type:String 
    },
    email:{
        type:String,
        trim:true,
        unique:[true, 'email must be unique'],
        minlength:[10 ,'too short email'],
        required:[true , 'you must enter your name '],
    },
    passwordChangeAt:Date
    ,
    phone:{
        type:String,
        required:[true , 'you must enter your phone number '],

    },
    password:{
        type:String,
        required:[true , 'you must enter your password '],
        minlength:[6,'minlength, must be 6']

    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"admin"
    },
    isActive:{
        type:Boolean,
        default:true
    }
    },
    {timestamps:true}
    );

// schema.pre('save', async function(){
// this.password= await bcrypt.hash(this.password,Number( process.env.ROUND))
// })
// schema.pre('findOneAndUpdate', async function(){
//     if(!this._update.password) return ;
//     this._update.password = await bcrypt.hash(this._update.password ,Number( process.env.ROUND))
//     })
schema.pre("save", async function () {
    
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND));
  });
  
  schema.pre("findOneAndUpdate", async function () {
    if (!this._update.password) return;
    this._update.password = await bcrypt.hash(
      this._update.password,
      Number(process.env.ROUND)
    );
  });
module.exports=model('user' , schema)



