import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';

export default function DoctorDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [appointments] = useState(() => DataStore.getAppointments());
  const doctors = DataStore.getDoctors();
  const prescriptions = DataStore.getPrescriptions();

  // Find the active doctor record matching currentUser email or default to Dr. Rajesh Sharma
  const doctor = doctors.find(d => d.email.toLowerCase() === currentUser?.email.toLowerCase()) || doctors[0];

  const myAppointments = appointments.filter(a => a.doctorId === doctor.id || a.doctorName.includes(currentUser?.name || ''));
  const activeQueue = myAppointments.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled');
  const nextPatient = activeQueue[0];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Clinical Consultation Desk</h1>
          <p className="page-header-desc">
            Welcome, <strong>{doctor.name}</strong> • {doctor.specialization} ({doctor.opdRoom})
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/doctor/prescriptions" className="btn btn-primary btn-sm">
            + Write Prescription
          </Link>
          <Link to="/doctor/appointments" className="btn btn-secondary btn-sm">
            My Appointments
          </Link>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Patients in Queue</div>
          <div className="stat-value" style={{ color: 'var(--color-primary)' }}>{activeQueue.length}</div>
          <div className="stat-meta">Awaiting consultation today</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Concluded Today</div>
          <div className="stat-value" style={{ color: 'var(--color-success)' }}>
            {myAppointments.filter(a => a.status === 'Completed').length}
          </div>
          <div className="stat-meta">Consultations completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Prescriptions Issued</div>
          <div className="stat-value">
            {prescriptions.filter(p => p.doctorId === doctor.id).length}
          </div>
          <div className="stat-meta">Digital clinical records</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">OPD Room Schedule</div>
          <div className="stat-value" style={{ fontSize: '1.25rem' }}>{doctor.opdRoom}</div>
          <div className="stat-meta">{doctor.schedule}</div>
        </div>
      </div>

      {/* Next Patient Card Banner */}
      {nextPatient ? (
        <div className="card" style={{
          marginBottom: '1.5rem',
          background: '#ffffff'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-scheduled" style={{ marginBottom: '0.4rem' }}>
                Next Patient in Line
              </span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0.25rem 0', color: 'var(--color-text)' }}>
                {nextPatient.patientName}
              </h2>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Chief Complaint: <strong>{nextPatient.reason}</strong> • Scheduled Slot: <span className="tabular-nums">{nextPatient.time}</span>
              </p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate('/doctor/prescriptions', { state: { prefillAppointment: nextPatient } });
              }}
            >
              Start Consultation & Prescribe →
            </button>
          </div>
        </div>
      ) : (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <span>Consultation queue is clear. All scheduled appointments for this slot have concluded.</span>
        </div>
      )}

      {/* Doctor's Today Appointment Queue Table */}
      <div className="card">
        <h2 className="card-title" style={{ marginBottom: '1rem' }}>Today's Outpatient Consultation Roster</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Patient Name</th>
                <th>Patient ID</th>
                <th>Reason for Visit</th>
                <th>Queue Status</th>
                <th>Clinical Action</th>
              </tr>
            </thead>
            <tbody>
              {myAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="tabular-nums" style={{ fontWeight: 600 }}>{apt.time}</td>
                  <td><strong>{apt.patientName}</strong></td>
                  <td className="tabular-nums" style={{ color: 'var(--color-primary)' }}>{apt.patientId}</td>
                  <td style={{ fontSize: '0.85rem' }}>{apt.reason}</td>
                  <td>
                    <span className={`badge ${
                      apt.status === 'Confirmed' ? 'badge-confirmed' :
                      apt.status === 'Completed' ? 'badge-completed' : 'badge-scheduled'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    {apt.status !== 'Completed' ? (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          navigate('/doctor/prescriptions', { state: { prefillAppointment: apt } });
                        }}
                      >
                        Prescribe
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                        Concluded
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
