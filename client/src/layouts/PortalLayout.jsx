import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CrossIcon,
  DashboardIcon,
  DoctorIcon,
  PatientIcon,
  AppointmentIcon,
  BillingIcon,
  UserIcon,
  PrescriptionIcon,
  RecordIcon
} from '../components/ui/Icons';

export default function PortalLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    switch (currentUser?.role) {
      case 'admin':
        return [
          { to: '/admin/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
          { to: '/admin/doctors', label: 'Doctors Roster', icon: <DoctorIcon /> },
          { to: '/admin/patients', label: 'Patients Directory', icon: <PatientIcon /> },
          { to: '/admin/appointments', label: 'Master Appointments', icon: <AppointmentIcon /> },
          { to: '/admin/billing', label: 'Billing & Reports', icon: <BillingIcon /> },
          { to: '/admin/users', label: 'User Accounts', icon: <UserIcon /> }
        ];
      case 'receptionist':
        return [
          { to: '/receptionist/dashboard', label: 'Front Desk', icon: <DashboardIcon /> },
          { to: '/receptionist/patients', label: 'Patient Intake & Search', icon: <PatientIcon /> },
          { to: '/receptionist/appointments', label: 'Appointment Desk', icon: <AppointmentIcon /> },
          { to: '/receptionist/billing', label: 'Billing Counter', icon: <BillingIcon /> }
        ];
      case 'doctor':
        return [
          { to: '/doctor/dashboard', label: 'Clinical Queue', icon: <DashboardIcon /> },
          { to: '/doctor/appointments', label: 'My Appointments', icon: <AppointmentIcon /> },
          { to: '/doctor/patients', label: 'Medical Records', icon: <RecordIcon /> },
          { to: '/doctor/prescriptions', label: 'Prescriptions', icon: <PrescriptionIcon /> }
        ];
      case 'patient':
        return [
          { to: '/patient/dashboard', label: 'My Portal', icon: <DashboardIcon /> },
          { to: '/patient/appointments', label: 'My Consultations', icon: <AppointmentIcon /> },
          { to: '/patient/prescriptions', label: 'My Prescriptions', icon: <PrescriptionIcon /> },
          { to: '/patient/bills', label: 'Invoices & Receipts', icon: <BillingIcon /> }
        ];
      default:
        return [];
    }
  };

  const roleTitleMap = {
    admin: 'Administrator Console',
    receptionist: 'Front Desk Operations',
    doctor: 'Doctor Clinical Workspace',
    patient: 'Patient Care Portal'
  };

  const navItems = getNavItems();

  return (
    <div className="portal-layout">
      {/* Sidebar */}
      <aside className={`portal-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to={`/${currentUser?.role}/dashboard`} className="brand-logo" onClick={() => setMobileOpen(false)}>
            <div className="brand-icon">
              <CrossIcon size={18} />
            </div>
            <span>CareLedger</span>
          </NavLink>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-title">Navigation</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-link-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-snippet">
            <div className="user-info">
              <span className="user-name" title={currentUser?.name}>{currentUser?.name}</span>
              <span className="user-role-badge">{currentUser?.role}</span>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              title="Sign Out"
              aria-label="Sign Out"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="portal-content">
        <header className="portal-topbar">
          <div className="topbar-left">
            <button
              className="mobile-nav-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              Menu
            </button>
            <div className="portal-title-tag">
              <span>{roleTitleMap[currentUser?.role] || 'Hospital Management'}</span>
            </div>
          </div>
          <div className="topbar-right">
            <span className="topbar-clock">
              Clinical Time: <strong className="tabular-nums">{currentTime}</strong>
            </span>
            <Link to="/home" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Hospital Directory
            </Link>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              {currentUser?.email}
            </span>
          </div>
        </header>

        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
