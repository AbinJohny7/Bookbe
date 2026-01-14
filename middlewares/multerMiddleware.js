const multer = require("multer");
//storage:
const storage = multer.diskStorage({
  //location to store files file
  // multer fns have 3 args ,request ,file and a callback fn
  // we describe the operations inside the call back fb
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },
  //modify the filename
  filename: (req, file, callBack) => {
    let date=Date.now()
    callBack(null, `Bookstore-${date}-${file.originalname}`);
  },
});

//file filter:to filter the file according to type,size etc..

const fileFilter = (req, file, callBack) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    
    //proceed to save
    callBack(null,true)
  } else {
    //return error
    callBack(null,false)
  }
};
const multerConfig =multer({storage,fileFilter})
module.exports=multerConfig