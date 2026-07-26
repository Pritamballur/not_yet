export default function Loader({ label = 'Loading' }) {
  return (
    <div className="empty-state">
      <div className="loader-dots">
        <span />
        <span />
        <span />
      </div>
      <p className="text-muted mono" style={{ fontSize: 12 }}>
        {label}
      </p>
    </div>
  );
}
