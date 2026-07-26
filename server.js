const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Station name is required'],
      trim: true,
    },
    stationCode: {
      type: String,
      required: [true, 'Station code is required'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    zone: {
      type: String,
      required: [true, 'Zone/area is required'],
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      default: 'Unspecified',
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'offline'],
      default: 'active',
    },
    installedAt: {
      type: Date,
      default: Date.now,
    },
    // Denormalized "latest reading" snapshot for fast dashboard loads
    latestReading: {
      aqi: { type: Number, default: null },
      category: { type: String, default: null },
      dominantPollutant: { type: String, default: null },
      pm25: Number,
      pm10: Number,
      co2: Number,
      no2: Number,
      so2: Number,
      o3: Number,
      temperature: Number,
      humidity: Number,
      recordedAt: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

StationSchema.index({ zone: 1 });
StationSchema.index({ 'location.lat': 1, 'location.lng': 1 });

module.exports = mongoose.model('Station', StationSchema);
