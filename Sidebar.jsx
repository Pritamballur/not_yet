import { AQI_HEX } from '../utils/aqi';

/**
 * Circular AQI dial — the app's signature visual element.
 * Reused in the dashboard hero, station cards, and station detail page
 * so the reading is always presented the same way, at any size.
 */
export default function AqiGauge({ aqi = 0, category = 'Good', size = 92, strokeWidth = 8 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(aqi / 300, 1); // scale visually up to 300 (Severe boundary)
  const offset = circumference * (1 - pct);
  const color = AQI_HEX[category] || AQI_HEX.Good;

  return (
    <div className="aqi-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="aqi-gauge-value">
        <span className="num" style={{ fontSize: size * 0.28, color }}>
          {Math.round(aqi)}
        </span>
        {size >= 70 && (
          <span className="cat" style={{ color }}>
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
