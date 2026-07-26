const Alert = require('../models/Alert');

// @desc    Get all alerts, supports ?acknowledged=true/false&severity=
// @route   GET /api/alerts
// @access  Public
const getAlerts = async (req, res, next) => {
  try {
    const { acknowledged, severity, limit = 50 } = req.query;
    const filter = {};
    if (acknowledged !== undefined) filter.acknowledged = acknowledged === 'true';
    if (severity) filter.severity = severity;

    const alerts = await Alert.find(filter)
      .populate('station', 'name stationCode zone')
      .sort({ createdAt: -1 })
      .limit(Math.min(Number(limit) || 50, 200));

    res.json({ success: true, count: alerts.length, alerts });
  } catch (err) {
    next(err);
  }
};

// @desc    Acknowledge an alert
// @route   PATCH /api/alerts/:id/acknowledge
// @access  Private/Admin
const acknowledgeAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { acknowledged: true, acknowledgedBy: req.user._id },
      { new: true }
    );
    if (!alert) {
      return res.status(404).json({ success: false, message: 'Alert not found' });
    }
    res.json({ success: true, alert });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAlerts, acknowledgeAlert };
