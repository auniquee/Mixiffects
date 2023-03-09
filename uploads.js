const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   destination: function(req, file, cb){
       cb(null, 'public/uploads/temp');
   },
   filename: function(req, file, cb){
       console.log(file);
       cb(null, Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limit: {filesize: 1024 * 1024 * 64}, //64 mb
   fileFilter: function(req, file, cb){
       checkFileType(file, cb)
   }
});

function checkFileType(file, cb){
   const filetypes = /mp3|wav|audio\/mpeg/;
   const extname =filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
   console.log(file.originalname, extname);
   const mimetype = filetypes.test(file.mimetype);
   console.log(file.mimetype)

   if(mimetype && extname) {
       return cb(null, true);
   } else {
       cb('Error: Sound Files Only!');
   }
}
module.exports = upload;
