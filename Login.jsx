export const AQI_COLORS = {
  Good: 'var(--aqi-good)',
  Moderate: 'var(--aqi-moderate)',
  Poor: 'var(--aqi-poor)',
  Unhealthy: 'var(--aqi-unhealthy)',
  Severe: 'var(--aqi-severe)',
  Hazardous: 'var(--aqi-hazardous)',
};

export const AQI_HEX = {
  Good: '#4ade80',
  Moderate: '#fbbf24',
  Poor: '#fb923c',
  Unhealthy: '#f0483e',
  Severe: '#c05fee',
  Hazardous: '#8a2848',
};

export const AQI_ADVICE = {
  Good: 'Air quality is satisfactory. Enjoy outdoor activities.',
  Moderate: 'Acceptable air quality. Unusually sensitive people should consider reducing prolonged outdoor exertion.',
  Poor: 'Members of sensitive groups may experience health effects. General public less likely to be affected.',
  Unhealthy: 'Everyone may begin to experience health effects. Sensitive groups should limit outdoor exertion.',
  Severe: 'Health alert: everyone may experience more serious health effects. Avoid outdoor activity.',
  Hazardous: 'Health emergency. The entire population is more likely to be affected. Stay indoors.',
};

export function categorySlug(category) {
  return (category || 'neutral').toLowerCase();
}

export function badgeClass(category) {
  return `badge badge-${categorySlug(category)}`;
}

export function formatDate(date) {
  if (!date) return '—';
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(date) {
  if (!date) return '—';
  const diffMs = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
