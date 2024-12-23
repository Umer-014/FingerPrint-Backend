const express = require('express');
const router = express.Router();
const fingerprintController = require('../Controllers/fingerprintController');

// Enroll Fingerprint
router.post('/enroll', fingerprintController.enrollFingerprint);
router.get('/enroll', fingerprintController.fetchEnrolledFingerprints);

// Scan Fingerprint
router.post('/scan', fingerprintController.scanFingerprint);
router.get('/scan', fingerprintController.fetchScanLogs);

// Get Template Count
router.get('/count', fingerprintController.getTemplateCount);

module.exports = router;
