import { useEffect, useState } from 'react';
import { alertApi } from '../api';
import { useAuth } from '../context/AuthContext';
import { AQI_HEX, formatDate } from '../utils/aqi';
import Loader from '../components/Loader';

export default function Alerts() {
  const { isAdmin } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('unacknowledged');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const params = filter === 'all' ? {} : { acknowledged: filter === 'acknowledged' };
      const { data } = await alertApi.getAll(params);
      setAlerts(data.alerts);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleAcknowledge = async (alertId) => {
    try {
      await alertApi.acknowledge(alertId);
      setAlerts((prev) => prev.map((a) => (a._id === alertId ? { ...a, acknowledged: true } : a)));
    } catch (err) {
      setError(err.response?.data?.message || 'Could not acknowledge alert.');
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Notifications</span>
          <h1>Pollution alerts</h1>
          <p className="subtitle">Auto-generated whenever a station's AQI crosses the unhealthy threshold (150+).</p>
        </div>
      </div>

      <div className="tag-select" style={{ marginBottom: 18 }}>
        {[
          ['unacknowledged', 'Unacknowledged'],
          ['acknowledged', 'Acknowledged'],
          ['all', 'All'],
        ].map(([value, label]) => (
          <button
            key={value}
            className={`tag-option${filter === value ? ' active' : ''}`}
            onClick={() => setFilter(value)}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <Loader label="Fetching alerts" />
      ) : alerts.length === 0 ? (
        <div className="empty-state">
          <h3>No alerts here</h3>
          <p>Nothing to show for this filter right now.</p>
        </div>
      ) : (
        <div>
          {alerts.map((alert) => (
            <div className="alert-row" key={alert._id}>
              <div className="stripe" style={{ background: AQI_HEX[alert.severity] || AQI_HEX.Poor }} />
              <div className="content">
                <div className="msg">{alert.message}</div>
                <div className="meta">
                  {alert.station?.zone} · AQI {alert.aqi} · {formatDate(alert.createdAt)}
                </div>
              </div>
              {isAdmin && !alert.acknowledged && (
                <button className="btn btn-secondary" onClick={() => handleAcknowledge(alert._id)}>
                  Acknowledge
                </button>
              )}
              {alert.acknowledged && <span className="badge badge-good">Acknowledged</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
