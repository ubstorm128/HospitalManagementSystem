import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CrossIcon } from '../components/ui/Icons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide both your registered email and password.');
      return;
    }

    try {
      const user = await login(email, password);

      const redirectMap = {
        admin: '/admin/dashboard',
        receptionist: '/receptionist/dashboard',
        doctor: '/doctor/dashboard',
        patient: '/patient/dashboard'
      };

      const destination = location.state?.from?.pathname || redirectMap[user.role] || '/login';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillCredentials = (roleKey, demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setSelectedRole(roleKey);
    setError('');
  };

  return (
    <div className="split-stage-container">
      {/* Left Stage: Clinical Institution & Historical Archive */}
      <div className="split-stage-media">
        <img
          src="/assets/architectural-drawing-for-a-chapel-and-hospital.jpg"
          alt="Architectural Drawing for a Chapel and Hospital, ca. 1767"
          className="bg-image photo-drift"
          decoding="async"
        />

        <div className="split-stage-media-content">
          <div className="motion-reveal motion-delay-1" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
            <div className="brand-icon">
              <CrossIcon size={20} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.1 }}>
              Apex St. Jude Clinical Health Network
            </div>
          </div>

          <h1 className="split-stage-title motion-reveal motion-delay-2">
            Clinical Operating Ledger & Intake Desk
          </h1>
          <p className="split-stage-sub motion-reveal motion-delay-3" style={{ fontSize: '1rem', color: '#c7d5de' }}>
            Central hospital intake and consultation workspace connecting reception desks, specialty outpatient wings, and financial ledgers.
          </p>

          <div className="motion-reveal motion-delay-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
            padding: '1.25rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-sm)'
          }}>
            <div className="motion-reveal motion-delay-4">
              <div style={{ fontSize: '1.65rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Level 1</div>
              <div style={{ fontSize: '1rem', color: '#94a7b3', marginTop: '0.2rem' }}>Emergency Triage Active</div>
            </div>
            <div className="motion-reveal motion-delay-5">
              <div style={{ fontSize: '1.65rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>4 Wings</div>
              <div style={{ fontSize: '1rem', color: '#94a7b3', marginTop: '0.2rem' }}>Specialty OPD Clinics</div>
            </div>
            <div className="motion-reveal motion-delay-6">
              <div style={{ fontSize: '1.65rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Instant</div>
              <div style={{ fontSize: '1rem', color: '#94a7b3', marginTop: '0.2rem' }}>Audit & Ledger Records</div>
            </div>
          </div>

          {/* Archival Facility Gallery (4 authentic historical records) */}
          <div style={{ marginTop: '2rem' }}>
            <div className="motion-reveal motion-delay-4" style={{ fontSize: '1rem', color: '#c7d5de', marginBottom: '0.75rem' }}>
              Historical Hospital Architecture & Elevation Archive (1767 to 1884)
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <img
                src="/assets/central-hospital-of-maracaibo.jpg"
                alt="Central Hospital architectural elevation"
                className="motion-reveal motion-delay-5 photo-drift"
                style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <img
                src="/assets/greenwich-hospital-the-painted-hall.jpg"
                alt="Historical hospital hall record"
                className="motion-reveal motion-delay-5 photo-drift"
                style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
              <img
                src="/assets/architectural-drawing-of-the-hospital-charters-towers.jpg"
                alt="Hospital elevation drawing 1884"
                className="motion-reveal motion-delay-6 photo-drift"
                style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />
            </div>
          </div>
        </div>

        <div className="split-stage-credits motion-reveal motion-delay-6" style={{ fontSize: '1rem', maxWidth: '50ch', marginTop: '1.5rem' }}>
          Historical Reference: "Architectural Drawing for a Chapel and Hospital" by de la Maire, ca. 1767. Public Domain (CC0), The Metropolitan Museum of Art.
        </div>
      </div>

      {/* Right Stage: Staff & Patient Authentication Desk */}
      <div className="split-stage-form-panel">
        <div className="motion-reveal motion-delay-1" style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 600, margin: 0, color: 'var(--color-text)' }}>
            Sign In to Workspace
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
            Select an operational role or provide your assigned staff credentials.
          </p>
        </div>

        {/* Quick Role Selection Grid */}
        <div className="motion-reveal motion-delay-2" style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
            Quick Workspace Switcher:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
            <button
              type="button"
              className={`btn ${selectedRole === 'admin' ? 'btn-primary' : 'btn-secondary'} motion-reveal motion-delay-2`}
              style={{ justifyContent: 'flex-start', padding: '12px 14px' }}
              onClick={() => fillCredentials('admin', 'admin@hospital.com', 'admin')}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Administrator</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.85 }}>Full Hospital Ops</div>
              </div>
            </button>
            <button
              type="button"
              className={`btn ${selectedRole === 'receptionist' ? 'btn-primary' : 'btn-secondary'} motion-reveal motion-delay-3`}
              style={{ justifyContent: 'flex-start', padding: '12px 14px' }}
              onClick={() => fillCredentials('receptionist', 'reception@hospital.com', 'reception')}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Receptionist</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.85 }}>Intake & Billing</div>
              </div>
            </button>
            <button
              type="button"
              className={`btn ${selectedRole === 'doctor' ? 'btn-primary' : 'btn-secondary'} motion-reveal motion-delay-4`}
              style={{ justifyContent: 'flex-start', padding: '12px 14px' }}
              onClick={() => fillCredentials('doctor', 'doctor.sharma@hospital.com', 'doctor')}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Dr. Sharma</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.85 }}>Cardiology Queue</div>
              </div>
            </button>
            <button
              type="button"
              className={`btn ${selectedRole === 'patient' ? 'btn-primary' : 'btn-secondary'} motion-reveal motion-delay-5`}
              style={{ justifyContent: 'flex-start', padding: '12px 14px' }}
              onClick={() => fillCredentials('patient', 'patient@hospital.com', 'patient')}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem' }}>Patient</div>
                <div style={{ fontSize: '0.95rem', opacity: 0.85 }}>Appointments & Rx</div>
              </div>
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error motion-reveal" role="alert" style={{ marginBottom: '1.5rem' }}>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="motion-reveal motion-delay-3">
          <div className="form-group motion-reveal motion-delay-3">
            <label className="form-label" htmlFor="email" style={{ fontSize: '1rem' }}>
              Institutional Email <span className="req">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="name@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group motion-reveal motion-delay-4" style={{ marginBottom: '1.75rem' }}>
            <label className="form-label" htmlFor="password" style={{ fontSize: '1rem' }}>
              Password <span className="req">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary motion-reveal motion-delay-5"
            style={{ width: '100%', padding: '13px', fontSize: '1rem' }}
            disabled={loading}
          >
            {loading ? 'Verifying Identity...' : 'Open Workspace'}
          </button>
        </form>

        <div className="motion-reveal motion-delay-6" style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Link
            to="/home"
            style={{ fontSize: '1rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
          >
            View Public Hospital Directory & Facilities →
          </Link>
        </div>
      </div>
    </div>
  );
}