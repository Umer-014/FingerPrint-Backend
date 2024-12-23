const mongoose = require('mongoose');

const FingerprintSchema = new mongoose.Schema({
  fingerId: { type: Number, required: true, unique: true },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model('Fingerprint', FingerprintSchema);
 