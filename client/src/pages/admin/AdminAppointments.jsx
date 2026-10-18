import { useState } from 'react';
import { DataStore } from '../../services/dataStore';

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(() => DataStore.getAppointments());
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const handleStatusChange = (id, newStatus) => {
    DataStore.updateAppointmentStatus(id, newStatus);
    setAppointments(DataStore.getAppointments());
  };

  const filtered = appointments.filter(a => {
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    const matchesSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      a.department.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Master Appointment Schedule</h1>
          <p className="page-header-desc">Hospital-wide consultation bookings, room queues, and status management</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem', justifyContent: 'space-between' }}>
        <div className="search-bar">
          <input
            type="text"
            className="form-input"
            placeholder="Search by patient, doctor, or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['All', 'Confirmed', 'Scheduled', 'Completed', 'Cancelled'].map((status) => (
            <button
              key={status}
              className={`btn btn-sm ${statusFilter === status ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Appt ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Department & Room</th>
              <th>Date & Time</th>
              <th>Chief Complaint</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((apt) => (
              <tr key={apt.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {apt.id}
                </td>
                <td>
                  <strong>{apt.patientName}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {apt.patientId}</div>
                </td>
                <td>{apt.doctorName}</td>
                <td>
                  <div>{apt.department}</div>
                  <div className="tabular-nums" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {apt.room}
                  </div>
                </td>
                <td className="tabular-nums">
                  <div>{apt.date}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{apt.time}</div>
                </td>
                <td style={{ maxWidth: '200px', fontSize: '0.85rem' }}>
                  {apt.reason}
                </td>
                <td>
                  <span className={`badge ${
                    apt.status === 'Confirmed' ? 'badge-confirmed' :
                    apt.status === 'Completed' ? 'badge-completed' :
                    apt.status === 'Cancelled' ? 'badge-cancelled' : 'badge-scheduled'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                      <>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 7px', fontSize: '0.75rem' }}
                          onClick={() => handleStatusChange(apt.id, 'Confirmed')}
                          title="Confirm appointment"
                        >
                          Confirm
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 7px', fontSize: '0.75rem', color: 'var(--color-error)' }}
                          onClick={() => handleStatusChange(apt.id, 'Cancelled')}
                          title="Cancel appointment"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {apt.status === 'Completed' && (
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>Concluded</span>
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
