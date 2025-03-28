const multer = require('multer');



//configure storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File Filter 

const fileFilter = (req, file, cb) => {

  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  }
  else{
    cb(new Error('File type not allowed'), false);
  }
 
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;