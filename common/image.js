const multer  = require('multer')
const { nanoid } = require('nanoid')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploadImges/')
    },
    filename: function (req, file, cb) {
      cb(null,nanoid()+"_"+file.originalname)
    }
  })
function fileFilter (req, file, cb) {


    if(file.mimetype === "image/png" || file.mimetype === "image/jpg"||file.mimetype === "image/jpeg"||file.mimetype === "image/PNG" ){
        
        cb(null, true)

    }else{
        cb("sorry invalid ex", false)
    }
  }

  const upload = multer({ dest:'uploadImges/',fileFilter,storage})


  module.exports = {upload}