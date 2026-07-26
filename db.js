const Reading = require('../models/Reading');
const Station = require('../models/Station');
const Alert = require('../models/Alert');
const { computeAQI } = require('../utils/aqiCalculator');

const ALERT_THRESHOLD_AQI = 150; // Poor and above triggers an alert

// @desc    Get readings for a station (history), supports ?limit=&from=&to=
// @route   GET /api/readings/station/:stationId
// @access  Public
const getReadingsForStation = async (req, res, next) => {
  try {
    const { stationId } = req.params;
    const { limit = 50, from, to } = req.query;

    const filter = { station: stationId };
    if (from || to) {
      filter.recordedAt = {};
      if (from) filter.recordedAt.$gte = new Date(from);
      if (to) filter.recordedAt.$lte = new Date(to);
    }

    const readings = await Reading.find(filter)
      .sort({ recordedAt: -1 })
      .limit(Math.min(Number(limit) || 50, 500));

    res.json({ success: true, count: readings.length, readings: readings.reverse() });
  } catch (err) {
    next(err);
  }
};

// @desc    Add a new reading for a station. Computes AQI, updates the
//          station's latestReading snapshot, and auto-creates an Alert
//          when the AQI crosses the unhealthy threshold.
// @route   POST /api/readings
// @access  Private/Admin
const createReading = async (req, res, next) => {
  try {
    const { station: stationId, pm25, pm10, co2, no2, so2, o3, temperature, humidity, recordedAt } = req.body;

    if (!stationId || pm25 === undefined || pm10 === undefined) {
      return res.status(400).json({ success: false, message: 'station, pm25 and pm10 are required' });
    }

    const station = await Station.findById(stationId);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    const { aqi, category, dominantPollutant } = computeAQI({ pm25, pm10, no2, so2, o3 });

    const reading = await Reading.create({
      station: stationId,
      pm25,
      pm10,
      co2,
      no2,
      so2,
      o3,
      temperature,
      humidity,
      aqi,
      category,
      dominantPollutant,
      source: 'manual',
      recordedBy: req.user._id,
      recordedAt: recordedAt || Date.now(),
    });

    station.latestReading = {
      aqi,
      category,
      dominantPollutant,
      pm25,
      pm10,
      co2,
      no2,
      so2,
      o3,
      temperature,
      humidity,
      recordedAt: reading.recordedAt,
    };
    await station.save();

    let alert = null;
    if (aqi >= ALERT_THRESHOLD_AQI) {
      alert = await Alert.create({
        station: stationId,
        reading: reading._id,
        severity: category,
        aqi,
        message: `${station.name} (${station.stationCode}) recorded AQI ${aqi} — ${category}. Dominant pollutant: ${dominantPollutant ? dominantPollutant.toUpperCase() : 'N/A'}.`,
      });
    }

    res.status(201).json({ success: true, reading, alert });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a reading
// @route   DELETE /api/readings/:id
// @access  Private/Admin
const deleteReading = async (req, res, next) => {
  try {
    const reading = await Reading.findById(req.params.id);
    if (!reading) {
      return res.status(404).json({ success: false, message: 'Reading not found' });
    }
    await reading.deleteOne();
    res.json({ success: true, message: 'Reading deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getReadingsForStation, createReading, deleteReading };
