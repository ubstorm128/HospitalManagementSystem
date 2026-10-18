import { useState } from 'react';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function DoctorPatients() {
  const patients = DataStore.getPatients();
  const prescriptions = DataStore.getPrescriptions();
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filtered = patients.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  const patientPrescriptions = selectedPatient
    ? prescriptions.filter(rx => rx.patientId === selectedPatient.id)
    : [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Clinical Patient Medical Records</h1>
          <p className="page-header-desc">Review diagnostic history, medication records, and clinical consultation timelines</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', maxWidth: '420px' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search by patient name, ID, or blood group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Age & Gender</th>
              <th>Blood Group</th>
              <th>Contact</th>
              <th>Clinical History</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const rxCount = prescriptions.filter(r => r.patientId === p.id).length;
              return (
                <tr key={p.id}>
                  <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                    {p.id}
                  </td>
                  <td><strong>{p.fullName}</strong></td>
                  <td className="tabular-nums">{p.age} yrs / {p.gender}</td>
                  <td>
                    <span className="badge badge-scheduled" style={{ fontWeight: 700 }}>
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="tabular-nums">{p.contactNumber}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {rxCount > 0 ? (
                      <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                        {rxCount} Past Prescription{rxCount > 1 ? 's' : ''}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>First-time visit</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedPatient(p)}
                    >
                      Open Chart
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Clinical Chart Modal */}
      {selectedPatient && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Clinical Medical Chart: {selectedPatient.fullName}</h2>
              <button className="modal-close" onClick={() => setSelectedPatient(null)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                padding: '1rem',
                background: 'var(--color-surface-subtle)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.25rem'
              }}>
                <div><span className="stat-label">Patient ID:</span> <strong>{selectedPatient.id}</strong></div>
                <div><span className="stat-label">Age/Gender:</span> <strong>{selectedPatient.age} / {selectedPatient.gender}</strong></div>
                <div><span className="stat-label">Blood Group:</span> <strong style={{ color: 'var(--color-primary)' }}>{selectedPatient.bloodGroup}</strong></div>
                <div><span className="stat-label">Phone:</span> <strong className="tabular-nums">{selectedPatient.contactNumber}</strong></div>
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-text)' }}>
                Prescription & Diagnosis History ({patientPrescriptions.length})
              </h3>

              {patientPrescriptions.length === 0 ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--color-text-muted)', fontStyle: 'italic', background: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  No prior digital prescriptions recorded for this patient.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {patientPrescriptions.map(rx => (
                    <div
                      key={rx.id}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-surface-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <strong style={{ color: 'var(--color-primary)' }}>{rx.diagnosis}</strong>
                        <span className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                          {rx.date} • {rx.doctorName}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        {rx.medicines.map((m, i) => (
                          <div key={i}>
                            <strong>{m.name}</strong> ({m.dosage}), {m.frequency} [{m.duration}]
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        Notes: {rx.notes}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedPatient(null)}>
                Close Chart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
