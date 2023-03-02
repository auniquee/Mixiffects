const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
   destination: function(req, file, cb){
       cb(null, 'public/uploads');
   },
   filename: function(req, file, cb){
       console.log(file);
       cb(null, Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limit: {filesize: 1000000},
   fileFilter: function(req, file, cb){
       checkFileType(file, cb)
   }
});

function checkFileType(file, cb){
   const filetypes = /jpeg|jpg|png|gif/;
   const extname =filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
   const mimetype = filetypes.test(file.mimetype);

   if(mimetype && extname) {
       return cb(null, true);
   } else {
       cb('Error: Images Only!');
   }
}
module.exports = upload;
