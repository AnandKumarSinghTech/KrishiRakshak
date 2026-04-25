

const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📁 Created /uploads directory');
}

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },

  filename: function (req, file, cb) {
    
    const ext      = path.extname(file.originalname); 
    const baseName = 'crop-' + Date.now();            
    cb(null, baseName + ext);
  },
});

const fileFilter = function (req, file, cb) {
  
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  
  } else {
    
    cb(new Error('❌ Only .jpg, .jpeg, .png, .webp images are allowed!'), false);
  }
};

const upload = multer({
  storage:    storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
});

module.exports = upload;
