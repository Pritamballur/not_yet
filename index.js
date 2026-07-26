import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', group: 'Monitor' },
  { to: '/map', label: 'City Map', group: 'Monitor' },
  { to: '/alerts', label: 'Alerts', group: 'Monitor' },
];

const ADMIN_ITEMS = [{ to: '/admin', label: 'Admin Panel', group: 'Manage' }];

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth();

  const groups = [...NAV_ITEMS, ...(isAdmin ? ADMIN_ITEMS : [])].reduce((acc, item) => {
    acc[item.group] = acc[item.group] || [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="mark" />
        <div>
          <span>AirWatch</span>
          <small>SMART CITY MONITORING</small>
        </div>
      </div>

      {Object.entries(groups).map(([group, items]) => (
        <div className="nav-group" key={group}>
          <div className="nav-group-label">{group}</div>
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="dot" />
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        {user ? (
          <>
            <div className="user-chip">
              <div className="avatar">{initials}</div>
              <div>
                <div className="name">{user.name}</div>
                <div className="role">{user.role}</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-block" style={{ marginTop: 10 }} onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-block">
            Sign in
          </NavLink>
        )}
      </div>
    </aside>
  );
}
