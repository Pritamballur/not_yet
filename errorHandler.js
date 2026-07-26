const Station = require('../models/Station');
const Alert = require('../models/Alert');
const User = require('../models/User');

// @desc    Get aggregate dashboard statistics: city-wide average AQI,
//          category breakdown, station counts, active alert counts.
// @route   GET /api/dashboard/stats
// @access  Public
const getStats = async (req, res, next) => {
  try {
    const stations = await Station.find({}, 'name stationCode zone status latestReading');

    const withReadings = stations.filter((s) => s.latestReading && typeof s.latestReading.aqi === 'number');
    const avgAqi = withReadings.length
      ? Math.round(withReadings.reduce((sum, s) => sum + s.latestReading.aqi, 0) / withReadings.length)
      : 0;

    const categoryBreakdown = withReadings.reduce((acc, s) => {
      const cat = s.latestReading.category || 'Unknown';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const worstStation = withReadings.length
      ? withReadings.reduce((worst, s) => (s.latestReading.aqi > worst.latestReading.aqi ? s : worst))
      : null;

    const bestStation = withReadings.length
      ? withReadings.reduce((best, s) => (s.latestReading.aqi < best.latestReading.aqi ? s : best))
      : null;

    const activeAlerts = await Alert.countDocuments({ acknowledged: false });
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      stats: {
        totalStations: stations.length,
        activeStations: stations.filter((s) => s.status === 'active').length,
        avgAqi,
        categoryBreakdown,
        worstStation: worstStation
          ? { name: worstStation.name, zone: worstStation.zone, aqi: worstStation.latestReading.aqi }
          : null,
        bestStation: bestStation
          ? { name: bestStation.name, zone: bestStation.zone, aqi: bestStation.latestReading.aqi }
          : null,
        activeAlerts,
        totalUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats };
