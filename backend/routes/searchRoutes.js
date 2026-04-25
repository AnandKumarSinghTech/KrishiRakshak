

const express          = require('express');
const router           = express.Router();
const { searchDiseases } = require('../controllers/searchController');

router.get('/search', searchDiseases);

module.exports = router;
