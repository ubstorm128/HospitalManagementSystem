import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PortalLayout from '../layouts/PortalLayout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

// Admin Portal Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminDoctors from '../pages/admin/AdminDoctors';
import AdminPatients from '../pages/admin/AdminPatients';
import AdminAppointments from '../pages/admin/AdminAppointments';
import AdminBilling from '../pages/admin/AdminBilling';
import AdminUsers from '../pages/admin/AdminUsers';

// Receptionist Portal Pages
import ReceptionistDashboard from '../pages/receptionist/ReceptionistDashboard';
import ReceptionistPatients from '../pages/receptionist/ReceptionistPatients';
import ReceptionistAppointments from '../pages/receptionist/ReceptionistAppointments';
import ReceptionistBilling from '../pages/receptionist/ReceptionistBilling';

// Doctor Portal Pages
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import DoctorAppointments from '../pages/doctor/DoctorAppointments';
import DoctorPatients from '../pages/doctor/DoctorPatients';
import DoctorPrescriptions from '../pages/doctor/DoctorPrescriptions';

// Patient Portal Pages
import PatientDashboard from '../pages/patient/PatientDashboard';
import PatientAppointments from '../pages/patient/PatientAppointments';
import PatientPrescriptions from '../pages/patient/PatientPrescriptions';
import PatientBills from '../pages/patient/PatientBills';

// Smart redirect at root URL
function RootRedirect() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/home" replace />;
  }

  const roleHome = {
    admin: '/admin/dashboard',
    receptionist: '/receptionist/dashboard',
    doctor: '/doctor/dashboard',
    patient: '/patient/dashboard'
  }[currentUser.role] || '/login';

  return <Navigate to={roleHome} replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Gateway */}
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />

      {/* Admin Portal (Isolated Role Namespace) */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<PortalLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="billing" element={<AdminBilling />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

      {/* Receptionist Portal (Isolated Role Namespace) */}
      <Route element={<ProtectedRoute allowedRoles={['receptionist']} />}>
        <Route path="/receptionist" element={<PortalLayout />}>
          <Route index element={<Navigate to="/receptionist/dashboard" replace />} />
          <Route path="dashboard" element={<ReceptionistDashboard />} />
          <Route path="patients" element={<ReceptionistPatients />} />
          <Route path="appointments" element={<ReceptionistAppointments />} />
          <Route path="billing" element={<ReceptionistBilling />} />
        </Route>
      </Route>

      {/* Doctor Clinical Workspace (Isolated Role Namespace) */}
      <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor" element={<PortalLayout />}>
          <Route index element={<Navigate to="/doctor/dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
        </Route>
      </Route>

      {/* Patient Care Portal (Isolated Role Namespace) */}
      <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
        <Route path="/patient" element={<PortalLayout />}>
          <Route index element={<Navigate to="/patient/dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
          <Route path="bills" element={<PatientBills />} />
        </Route>
      </Route>

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}