const mongoose = require('mongoose');

const ScanLogSchema = new mongoose.Schema({
  fingerId: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, required: true }, // e.g., "Match" or "No Match"
});

module.exports = mongoose.model('ScanLog', ScanLogSchema);
