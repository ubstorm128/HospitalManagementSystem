import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Role mismatch: redirect to the user's authorized home portal
    const roleLanding = {
      admin: '/admin/dashboard',
      receptionist: '/receptionist/dashboard',
      doctor: '/doctor/dashboard',
      patient: '/patient/dashboard'
    }[currentUser.role] || '/login';

    return <Navigate to={roleLanding} replace />;
  }

  return <Outlet />;
}
