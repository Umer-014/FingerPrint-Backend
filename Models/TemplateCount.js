const mongoose = require('mongoose');

const TemplateCountSchema = new mongoose.Schema({
  count: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('TemplateCount', TemplateCountSchema);
