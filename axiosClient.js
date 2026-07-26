import { Link } from 'react-router-dom';
import AqiGauge from './AqiGauge';
import { badgeClass, timeAgo } from '../utils/aqi';

export default function StationCard({ station }) {
  const lr = station.latestReading || {};
  const hasData = typeof lr.aqi === 'number';

  return (
    <Link to={`/stations/${station._id}`} className="card station-card">
      <div className="station-card-top">
        <div>
          <div className="station-name">{station.name}</div>
          <div className="station-zone">
            {station.zone} · <span className="mono">{station.stationCode}</span>
          </div>
        </div>
        <span className={station.status === 'active' ? 'badge badge-good' : 'badge badge-neutral'}>
          <span className="dot" />
          {station.status}
        </span>
      </div>

      <div className="station-body">
        <AqiGauge aqi={hasData ? lr.aqi : 0} category={lr.category || 'Good'} size={72} strokeWidth={7} />
        <div className="station-metrics">
          <div className="metric-pill">
            <div className="m-label">PM2.5</div>
            <div className="m-value">{hasData ? `${lr.pm25} µg/m³` : '—'}</div>
          </div>
          <div className="metric-pill">
            <div className="m-label">PM10</div>
            <div className="m-value">{hasData ? `${lr.pm10} µg/m³` : '—'}</div>
          </div>
          <div className="metric-pill">
            <div className="m-label">Updated</div>
            <div className="m-value">{hasData ? timeAgo(lr.recordedAt) : '—'}</div>
          </div>
        </div>
      </div>

      {hasData && (
        <span className={badgeClass(lr.category)} style={{ alignSelf: 'flex-start' }}>
          <span className="dot" />
          {lr.category}
        </span>
      )}
    </Link>
  );
}
