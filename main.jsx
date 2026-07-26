import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import StationDetail from './pages/StationDetail';
import Alerts from './pages/Alerts';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function Shell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <Shell>
              <Dashboard />
            </Shell>
          }
        />
        <Route
          path="/map"
          element={
            <Shell>
              <MapView />
            </Shell>
          }
        />
        <Route
          path="/stations/:id"
          element={
            <Shell>
              <StationDetail />
            </Shell>
          }
        />
        <Route
          path="/alerts"
          element={
            <Shell>
              <Alerts />
            </Shell>
          }
        />
        <Route
          path="/admin"
          element={
            <Shell>
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            </Shell>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
