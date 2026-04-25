

const express = require('express');
const router  = express.Router();

const { getAlert, getAlertHistory, getRecentAlerts } = require('../controllers/alertController');

router.get('/history/:userId', getAlertHistory);

router.get('/recent/:userId', getRecentAlerts);

router.get('/:userId', getAlert);

module.exports = router;
