import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';

export default function DoctorAppointments() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState(() => DataStore.getAppointments());
  const doctors = DataStore.getDoctors();

  const doctor = doctors.find(d => d.email.toLowerCase() === currentUser?.email.toLowerCase()) || doctors[0];
  const myAppointments = appointments.filter(a => a.doctorId === doctor.id || a.doctorName.includes(currentUser?.name || ''));

  const handleComplete = (id) => {
    DataStore.updateAppointmentStatus(id, 'Completed');
    setAppointments(DataStore.getAppointments());
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">My Assigned Consultations</h1>
          <p className="page-header-desc">Scheduled OPD patient list and clinical progress tracking</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Appt #</th>
              <th>Patient</th>
              <th>Date & Time</th>
              <th>Reason for Visit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((apt) => (
              <tr key={apt.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {apt.id}
                </td>
                <td>
                  <strong>{apt.patientName}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {apt.patientId}</div>
                </td>
                <td className="tabular-nums">
                  <div>{apt.date}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{apt.time}</div>
                </td>
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
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {apt.status !== 'Completed' ? (
                      <>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            navigate('/doctor/prescriptions', { state: { prefillAppointment: apt } });
                          }}
                        >
                          Prescribe
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleComplete(apt.id)}
                        >
                          Conclude
                        </button>
                      </>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>
                        Concluded
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
