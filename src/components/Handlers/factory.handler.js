const AppError = require('../../utils/AppError');
const slugify = require('slugify')
const {catchAsyncError} = require('../../utils/catchAsyncError');
const ApiFeatures = require('../../utils/Api.featuers');


module.exports.deleteOne=(Model)=>catchAsyncError( async (req,res,next)=>{
    const { id } = req.params;
    const Document = await Model.findByIdAndDelete(id);
    !Document && next(new AppError("Document Deleted" , 400))
     Document &&  res.status(200).json({message : "Document Deleted",result:Document })
   
})



module.exports.getAll=(Model)=>catchAsyncError(async (req,res)=>{
    
    let apiFeatures = new ApiFeatures(Model.find({}),req.query).pagination().fields().search().filter().sort()
    const Document  = await apiFeatures.mongooseQuery;
    !Document && next(new AppError("Document not found" , 400))
    Document &&  res.status(200).json({page:apiFeatures.page ,Document})
});




module.exports.getSpecific=(Model)=> catchAsyncError (async (req,res,next)=>{
    const {id} = req.params;
    const Document = await Model.findById(id);
    !Document && next(new AppError("Document not found" , 400))
     Document &&  res.status(200).json(Document)
}
) 


module.exports.updateOne=(Model)=>catchAsyncError(async(req,res,next)=>{
    const { id } = req.params;
    if(req.body.name)
    {
        req.body.slug = slugify(req.body.name)
    }
    req.body.image = req.file?.filename  
    const Document = await Model.findByIdAndUpdate(id,
    req.body,
    {new:true});
    !Document && next(new AppError("Document not found" , 400))
     Document &&  res.status(200).json({message:"Document Updated" ,Document })
})


module.exports.createOne=(Model)=>catchAsyncError(async(req,res,err)=>{
   if(req.files){

       let images = []
       req.body.ImageCover = req.files.ImageCover[0].filename
       req.files.Images.forEach((element) => {
           images.push(element.filename)
       });
       req.body.Images = images
   }
    req.body.slug = slugify(req.body.name)    
    req.body.image=req.file?.filename
    const Document = new Model(req.body)
    await Document.save()
    res.status(200).json({Document , error:err.message})
})  