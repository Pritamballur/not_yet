const Station = require('../models/Station');
const Reading = require('../models/Reading');
const Alert = require('../models/Alert');

// @desc    Get all stations (supports ?zone=&status=&search=)
// @route   GET /api/stations
// @access  Public
const getStations = async (req, res, next) => {
  try {
    const { zone, status, search } = req.query;
    const filter = {};

    if (zone) filter.zone = zone;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { stationCode: { $regex: search, $options: 'i' } },
        { zone: { $regex: search, $options: 'i' } },
      ];
    }

    const stations = await Station.find(filter).sort({ 'latestReading.aqi': -1 });
    res.json({ success: true, count: stations.length, stations });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single station by id
// @route   GET /api/stations/:id
// @access  Public
const getStation = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }
    res.json({ success: true, station });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new station
// @route   POST /api/stations
// @access  Private/Admin
const createStation = async (req, res, next) => {
  try {
    const { name, stationCode, zone, city, location, status } = req.body;

    if (!name || !stationCode || !zone || !location || location.lat === undefined || location.lng === undefined) {
      return res.status(400).json({
        success: false,
        message: 'name, stationCode, zone and location {lat, lng} are required',
      });
    }

    const station = await Station.create({
      name,
      stationCode,
      zone,
      city,
      location,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, station });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a station
// @route   PUT /api/stations/:id
// @access  Private/Admin
const updateStation = async (req, res, next) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    res.json({ success: true, station });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a station (and its readings/alerts)
// @route   DELETE /api/stations/:id
// @access  Private/Admin
const deleteStation = async (req, res, next) => {
  try {
    const station = await Station.findById(req.params.id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found' });
    }

    await Reading.deleteMany({ station: station._id });
    await Alert.deleteMany({ station: station._id });
    await station.deleteOne();

    res.json({ success: true, message: 'Station and associated data deleted' });
  } catch (err) {
    next(err);
  }
};

// @desc    Get distinct zones (for filters)
// @route   GET /api/stations/meta/zones
// @access  Public
const getZones = async (req, res, next) => {
  try {
    const zones = await Station.distinct('zone');
    res.json({ success: true, zones });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStations, getStation, createStation, updateStation, deleteStation, getZones };
