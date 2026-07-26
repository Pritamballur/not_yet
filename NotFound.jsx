/* ==========================================================================
   Design tokens — AirWatch / Smart City Pollution Monitoring System
   Theme: atmospheric night sky, signature = the AQI scale itself used as
   the accent system (functional data-color, not decoration).
   ========================================================================== */

:root {
  /* Surfaces */
  --bg: #0a0e1a;
  --bg-elevated: #0e1424;
  --surface: #131b2e;
  --surface-hover: #182444;
  --border: rgba(232, 236, 244, 0.08);
  --border-strong: rgba(232, 236, 244, 0.16);

  /* Text */
  --text-primary: #e8ecf4;
  --text-secondary: #a7b0c3;
  --text-muted: #6b7690;

  /* AQI scale — the signature element, reused everywhere: gauges, cards,
     map pins, charts, badges. Never used decoratively. */
  --aqi-good: #4ade80;
  --aqi-good-bg: rgba(74, 222, 128, 0.12);
  --aqi-moderate: #fbbf24;
  --aqi-moderate-bg: rgba(251, 191, 36, 0.12);
  --aqi-poor: #fb923c;
  --aqi-poor-bg: rgba(251, 146, 60, 0.12);
  --aqi-unhealthy: #f0483e;
  --aqi-unhealthy-bg: rgba(240, 72, 62, 0.12);
  --aqi-severe: #c05fee;
  --aqi-severe-bg: rgba(192, 95, 238, 0.14);
  --aqi-hazardous: #8a2848;
  --aqi-hazardous-bg: rgba(138, 40, 72, 0.24);

  /* Accent (used sparingly, for interactive elements — not data) */
  --accent: #3fb0e8;
  --accent-dim: rgba(63, 176, 232, 0.14);

  /* Type */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Radii & shadow */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 20px;
  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 32px -12px rgba(0, 0, 0, 0.5);
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  background:
    radial-gradient(1200px 600px at 15% -10%, rgba(63, 176, 232, 0.08), transparent 60%),
    radial-gradient(900px 500px at 100% 0%, rgba(192, 95, 238, 0.06), transparent 55%),
    var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-display);
  margin: 0;
  letter-spacing: -0.01em;
}

p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font-family: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

::selection {
  background: var(--accent-dim);
  color: var(--text-primary);
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

/* ---- Layout shell ------------------------------------------------------ */

.app-shell {
  display: flex;
  min-height: 100vh;
}

.app-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.page {
  padding: 32px clamp(20px, 4vw, 48px) 64px;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
}

.page-header .eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 6px;
  display: block;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: 6px;
}

/* ---- Navbar / Sidebar --------------------------------------------------- */

.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: var(--bg-elevated);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
  position: sticky;
  top: 0;
  height: 100vh;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px 24px;
}

.sidebar-brand .mark {
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: conic-gradient(from 220deg, var(--aqi-good), var(--aqi-moderate), var(--aqi-poor), var(--aqi-unhealthy), var(--aqi-severe));
  flex-shrink: 0;
}

.sidebar-brand span {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 17px;
}

.sidebar-brand small {
  display: block;
  font-size: 10px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  letter-spacing: 0.06em;
}

.nav-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 18px;
}

.nav-group-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  padding: 10px 12px 6px;
  font-family: var(--font-mono);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--text-secondary);
  transition: background 0.15s ease, color 0.15s ease;
}

.nav-link:hover {
  background: var(--surface-hover);
  color: var(--text-primary);
}

.nav-link.active {
  background: var(--accent-dim);
  color: var(--accent);
  font-weight: 500;
}

.nav-link .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
}

.sidebar-footer {
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid var(--border);
}

.user-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: var(--radius-sm);
}

.user-chip .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--surface-hover);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  border: 1px solid var(--border-strong);
}

.user-chip .name {
  font-size: 13px;
  font-weight: 500;
}

.user-chip .role {
  font-size: 11px;
  color: var(--text-muted);
  text-transform: capitalize;
}

.topbar {
  display: none;
}

/* ---- Cards --------------------------------------------------------------- */

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-card);
}

.grid {
  display: grid;
  gap: 18px;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}
.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

@media (max-width: 1100px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 720px) {
  .grid-cols-4,
  .grid-cols-3,
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
  .sidebar {
    display: none;
  }
  .topbar {
    display: flex;
  }
}

/* ---- Stat / metric cards -------------------------------------------------- */

.stat-card .stat-label {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 10px;
}

.stat-card .stat-value {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 600;
  line-height: 1;
}

.stat-card .stat-sub {
  margin-top: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

/* ---- AQI Gauge (signature component) -------------------------------------- */

.aqi-gauge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.aqi-gauge svg {
  transform: rotate(-90deg);
}

.aqi-gauge-value {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.aqi-gauge-value .num {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1;
}

.aqi-gauge-value .cat {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

/* ---- Badges ---------------------------------------------------------------- */

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--font-mono);
  white-space: nowrap;
}

.badge .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.badge-good {
  color: var(--aqi-good);
  background: var(--aqi-good-bg);
}
.badge-moderate {
  color: var(--aqi-moderate);
  background: var(--aqi-moderate-bg);
}
.badge-poor {
  color: var(--aqi-poor);
  background: var(--aqi-poor-bg);
}
.badge-unhealthy {
  color: var(--aqi-unhealthy);
  background: var(--aqi-unhealthy-bg);
}
.badge-severe {
  color: var(--aqi-severe);
  background: var(--aqi-severe-bg);
}
.badge-hazardous {
  color: #f0a8bd;
  background: var(--aqi-hazardous-bg);
}
.badge-neutral {
  color: var(--text-secondary);
  background: var(--surface-hover);
}

/* ---- Station cards ----------------------------------------------------- */

.station-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.station-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
}

.station-card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.station-card .station-name {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 600;
}

.station-card .station-zone {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.station-card .station-body {
  display: flex;
  align-items: center;
  gap: 16px;
}

.station-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  flex: 1;
}

.metric-pill {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
}

.metric-pill .m-label {
  font-size: 10px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
}

.metric-pill .m-value {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  margin-top: 2px;
}

/* ---- Forms --------------------------------------------------------------- */

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-field label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

.form-field input,
.form-field select,
.form-field textarea {
  background: var(--bg-elevated);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  font-size: 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-dim);
  outline: none;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

@media (max-width: 560px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid transparent;
  transition: filter 0.15s ease, transform 0.05s ease;
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background: var(--accent);
  color: #04121b;
}

.btn-primary:hover {
  filter: brightness(1.08);
}

.btn-secondary {
  background: var(--surface-hover);
  color: var(--text-primary);
  border-color: var(--border-strong);
}

.btn-secondary:hover {
  border-color: var(--accent);
}

.btn-danger {
  background: rgba(240, 72, 62, 0.14);
  color: var(--aqi-unhealthy);
  border-color: rgba(240, 72, 62, 0.3);
}

.btn-block {
  width: 100%;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ---- Auth pages ------------------------------------------------------------ */

.auth-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
}

@media (max-width: 900px) {
  .auth-shell {
    grid-template-columns: 1fr;
  }
  .auth-visual {
    display: none;
  }
}

.auth-visual {
  background: var(--bg-elevated);
  border-right: 1px solid var(--border);
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.auth-visual::before {
  content: '';
  position: absolute;
  inset: -20% -20% auto auto;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--aqi-severe) 0%, transparent 65%);
  opacity: 0.18;
}

.auth-form-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.auth-card h1 {
  font-size: 24px;
  margin-bottom: 6px;
}

.auth-card .subtitle {
  margin-bottom: 28px;
}

.auth-switch {
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: var(--text-secondary);
}

.auth-switch a {
  color: var(--accent);
  font-weight: 600;
}

.error-banner {
  background: var(--aqi-unhealthy-bg);
  border: 1px solid rgba(240, 72, 62, 0.3);
  color: #ffb4ae;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  margin-bottom: 16px;
}

/* ---- Alerts list ------------------------------------------------------------ */

.alert-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-elevated);
}

.alert-row + .alert-row {
  margin-top: 10px;
}

.alert-row .stripe {
  width: 4px;
  align-self: stretch;
  border-radius: 4px;
  flex-shrink: 0;
}

.alert-row .content {
  flex: 1;
  min-width: 0;
}

.alert-row .msg {
  font-size: 13px;
  color: var(--text-primary);
}

.alert-row .meta {
  font-size: 11px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  margin-top: 4px;
}

/* ---- Tables ------------------------------------------------------------------ */

table.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.data-table th {
  text-align: left;
  color: var(--text-muted);
  font-family: var(--font-mono);
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.05em;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border);
}

.data-table tr:last-child td {
  border-bottom: none;
}

.data-table tr:hover td {
  background: var(--surface-hover);
}

/* ---- Misc ---------------------------------------------------------------------- */

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 60px 20px;
  text-align: center;
  color: var(--text-muted);
}

.empty-state h3 {
  color: var(--text-secondary);
  font-size: 16px;
}

.loader-dots {
  display: inline-flex;
  gap: 5px;
}

.loader-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  animation: pulse 1.1s ease-in-out infinite;
}

.loader-dots span:nth-child(2) {
  animation-delay: 0.15s;
}
.loader-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pulse {
  0%,
  80%,
  100% {
    opacity: 0.25;
    transform: scale(0.85);
  }
  40% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.tag-select {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-option {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  font-size: 13px;
  color: var(--text-secondary);
  background: var(--bg-elevated);
  transition: all 0.15s ease;
}

.tag-option.active {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
}

.leaflet-container {
  width: 100%;
  height: 100%;
  background: var(--bg-elevated);
}

.map-shell {
  height: 560px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
}

.aqi-pin {
  width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.aqi-pin span {
  transform: rotate(45deg);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  color: #04121b;
}

.section-title {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mono {
  font-family: var(--font-mono);
}

.text-muted {
  color: var(--text-muted);
}

.text-secondary {
  color: var(--text-secondary);
}
