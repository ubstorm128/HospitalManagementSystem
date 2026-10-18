import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataStore } from '../../services/dataStore';

export default function ReceptionistDashboard() {
  const [appointments, setAppointments] = useState(() => DataStore.getAppointments());
  const patients = DataStore.getPatients();
  const doctors = DataStore.getDoctors();
  const bills = DataStore.getBills();

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(a => a.date === '2026-10-17' || a.date === today);

  const handleCheckIn = (id) => {
    DataStore.updateAppointmentStatus(id, 'Confirmed');
    setAppointments(DataStore.getAppointments());
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Front Desk Reception Operations</h1>
          <p className="page-header-desc">Outpatient intake queue, walk-in scheduling, and doctor OPD room availability</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/receptionist/patients" className="btn btn-primary btn-sm">
            + New Patient Intake
          </Link>
          <Link to="/receptionist/appointments" className="btn btn-secondary btn-sm">
            + Book Appointment
          </Link>
          <Link to="/receptionist/billing" className="btn btn-secondary btn-sm">
            Cashier Desk
          </Link>
        </div>
      </div>

      {/* Front Desk Key Metrics */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Today's Appointments</div>
          <div className="stat-value">{todayAppointments.length}</div>
          <div className="stat-meta">Scheduled for today's OPD</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Doctors on Duty</div>
          <div className="stat-value">{doctors.filter(d => d.status === 'Available').length} / {doctors.length}</div>
          <div className="stat-meta">Available in consultation rooms</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Registered Patients</div>
          <div className="stat-value">{patients.length}</div>
          <div className="stat-meta">Central hospital database</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Invoices</div>
          <div className="stat-value" style={{ color: 'var(--color-warning)' }}>
            {bills.filter(b => b.status === 'Pending').length}
          </div>
          <div className="stat-meta">Awaiting payment collection</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Today's Queue */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Today's Consultation Queue</h2>
            <Link to="/receptionist/appointments" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Full Schedule →
            </Link>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Doctor & Room</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td className="tabular-nums" style={{ fontWeight: 600 }}>{apt.time}</td>
                    <td>
                      <strong>{apt.patientName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{apt.reason}</div>
                    </td>
                    <td>
                      <div>{apt.doctorName}</div>
                      <div className="tabular-nums" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{apt.room}</div>
                    </td>
                    <td>
                      <span className={`badge ${apt.status === 'Confirmed' ? 'badge-confirmed' : 'badge-scheduled'}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td>
                      {apt.status === 'Scheduled' ? (
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                          onClick={() => handleCheckIn(apt.id)}
                        >
                          Check In
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>Checked In</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor OPD Room Status */}
        <div className="card">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Doctor Consultation Rooms</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {doctors.map((doc) => (
              <div
                key={doc.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem',
                  background: '#f8fafc',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{doc.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {doc.specialization} • <span className="tabular-nums">{doc.opdRoom}</span>
                  </div>
                  <div className="tabular-nums" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {doc.schedule}
                  </div>
                </div>
                <div>
                  <span className={`badge ${doc.status === 'Available' ? 'badge-confirmed' : 'badge-pending'}`}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
