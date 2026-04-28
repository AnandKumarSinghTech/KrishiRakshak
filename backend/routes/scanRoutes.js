

const express = require('express');
const router  = express.Router();

const { getScans, filterScans, deleteScan, createScan } = require('../controllers/scanController');

router.post('/', createScan);

router.get('/filter', filterScans);

router.get('/:userId', getScans);

router.delete('/:id', deleteScan);

module.exports = router;
