const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema(
  {
    station: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      required: true,
    },
    reading: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reading',
    },
    severity: {
      type: String,
      enum: ['Poor', 'Unhealthy', 'Severe', 'Hazardous'],
      required: true,
    },
    aqi: { type: Number, required: true },
    message: { type: String, required: true },
    acknowledged: { type: Boolean, default: false },
    acknowledgedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', AlertSchema);
