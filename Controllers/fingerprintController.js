const Fingerprint = require('../Models/fingerprintModel');
const ScanLog = require('../Models/ScanLog');
const TemplateCount = require('../Models/TemplateCount');

// Enroll a new fingerprint
exports.enrollFingerprint = async (req, res) => {
  try {
    const { fingerId, timestamp } = req.body;

    // Check if fingerId already exists
    const existingFingerprint = await Fingerprint.findOne({ fingerId });
    if (existingFingerprint) {
      return res.status(400).json({ message: 'Finger ID already exists' });
    }

    // Create a new fingerprint
    const newFingerprint = new Fingerprint({ fingerId, timestamp });
    await newFingerprint.save();

    // Update the template count
    let templateCount = await TemplateCount.findOne();
    if (!templateCount) {
      templateCount = new TemplateCount({ count: 0 });
    }
    templateCount.count += 1;
    await templateCount.save();

    res.status(201).json({ message: 'Fingerprint enrolled successfully', newFingerprint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all enrolled fingerprints
exports.fetchEnrolledFingerprints = async (req, res) => {
  try {
    const fingerprints = await Fingerprint.find();
    res.status(200).json(fingerprints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Scan a fingerprint
exports.scanFingerprint = async (req, res) => {
  try {
    const { fingerId, timestamp, status } = req.body;

    // Log the scan
    const newScanLog = new ScanLog({ fingerId, timestamp, status });
    await newScanLog.save();

    res.status(200).json({ message: 'Scan logged successfully', newScanLog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all scan logs
exports.fetchScanLogs = async (req, res) => {
  try {
    const scanLogs = await ScanLog.find();
    res.status(200).json(scanLogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get the template count
exports.getTemplateCount = async (req, res) => {
  try {
    const templateCount = await TemplateCount.findOne();
    res.status(200).json({ count: templateCount ? templateCount.count : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};