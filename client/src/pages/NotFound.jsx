import { Link } from 'react-router-dom';
import { SearchIcon } from '../components/ui/Icons';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ maxWidth: '440px', textAlign: 'center', padding: '2.5rem 2rem' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#f1f5f9',
          color: 'var(--color-primary)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <SearchIcon size={28} />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem', color: 'var(--color-text)' }}>
          404: Page Not Found
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          The requested clinical route does not exist or your account permissions do not grant access to this portal.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex' }}>
          Return to Workspace Home
        </Link>
      </div>
    </div>
  );
}