import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from './Loader';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="page">
        <Loader label="Checking session" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="page">
        <div className="empty-state">
          <h3>Admins only</h3>
          <p>Your account does not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
}
