

const express = require('express');
const router  = express.Router();

const upload  = require('../middleware/upload');

const { detectDisease, getDiseases } = require('../controllers/detectController');

router.post(
  '/detect',
  upload.single('image'),  
  detectDisease            
);

router.get('/diseases/:cropName', getDiseases);

module.exports = router;
