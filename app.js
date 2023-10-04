process.on('uncaughtException',(err)=>{
    console.log('uncaughtException',err)
})
const express = require('express')
const { dbConnection } = require('./src/dataBase/dbConnection')
const morgan = require ('morgan')
const AppError = require('./src/utils/AppError')
const globalHandleErrorMiddleware = require('./src/utils/globalHandleErrorMiddleware')
const {  allRequires } = require('./src/utils')
const app = express()
require('dotenv').config({path:'./config/.env'})
const port = process.env.PORT || 4000 

//middleware
app.use(express.json())
app.use(express.static('uploads'));
if (process.env.MODE_ENV==="development"){
    app.use(morgan('dev'))
}

allRequires(app)

//to handle unHandling routes
app.all('*',(req,res,next)=>{
    next(new AppError(`can't find this route :${req.originalUrl} on server` , 404))
})

// global errors handling middleware
app.use(globalHandleErrorMiddleware);
dbConnection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on('unhandledRejection',(err)=>{
    console.log('unhandledRejection',err)
})