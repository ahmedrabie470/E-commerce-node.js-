const mongoose = require('mongoose')


exports.dbConnection = ()=>{
    mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log('data base connected');
    }).catch((err)=>{
        console.log(err);
    })
}