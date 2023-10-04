const AppError = require('../../utils/AppError')
const multer  = require('multer')


let uploadOptions=(folderName)=>{
  const storage = multer.diskStorage({
    destination : function (req, file, cb) {
      cb(null , `uploads/${folderName}`)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
// filter images and files
function fileFilter (req, file, cb) {

if (file.mimetype.startsWith('image')) {
  cb(null, true)
}else{
  cb(new AppError('image only',400), false)

}}
const upload = multer({ storage: storage  , fileFilter})
return upload
}



// upload one file 
exports.uploadFile = (fieldName,folderName) => uploadOptions(folderName).single(fieldName)
 
  // upload more files 
exports.uploadMoreFile = (fieldsName,folderName) => uploadOptions(folderName).fields(fieldsName)