import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';
import { PrescriptionIcon, CloseIcon } from '../../components/ui/Icons';

export default function PatientPrescriptions() {
  const { currentUser } = useAuth();
  const patients = DataStore.getPatients();
  const prescriptions = DataStore.getPrescriptions();
  const [selectedRx, setSelectedRx] = useState(null);

  const patient = patients.find(p => p.email.toLowerCase() === currentUser?.email.toLowerCase()) || patients[0];
  const myPrescriptions = prescriptions.filter(p => p.patientId === patient.id || p.patientName === patient.fullName);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">My Digital Prescriptions</h1>
          <p className="page-header-desc">Access doctor-signed prescription slips, medication schedules, and clinical notes</p>
        </div>
      </div>

      {myPrescriptions.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <div style={{ marginBottom: '0.75rem', color: 'var(--color-primary)' }}>
            <PrescriptionIcon size={36} />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', color: 'var(--color-text)' }}>No Prescriptions Found</h3>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
            You do not have any active medical prescriptions recorded yet.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.25rem' }}>
          {myPrescriptions.map((rx) => (
            <div key={rx.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{rx.id}</span>
                  <span className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rx.date}</span>
                </div>

                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.15rem', color: 'var(--color-text)' }}>
                  {rx.diagnosis}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                  Prescribed by <strong>{rx.doctorName}</strong>
                </div>

                <div style={{
                  padding: '0.85rem',
                  background: '#f8fafc',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                    Medication Schedule:
                  </div>
                  {rx.medicines.map((m, idx) => (
                    <div key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                      <strong>{m.name}</strong> ({m.dosage})<br />
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Take: {m.frequency} [{m.duration}]
                      </span>
                    </div>
                  ))}
                </div>

                {rx.notes && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginBottom: '1rem' }}>
                    Doctor's Advice: {rx.notes}
                  </div>
                )}
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedRx(rx)}
                style={{ width: '100%' }}
              >
                View Certified Prescription Slip
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Slip Modal */}
      {selectedRx && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Prescription Slip: {selectedRx.id}</h2>
              <button className="modal-close" onClick={() => setSelectedRx(null)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body" style={{ background: '#ffffff', fontFamily: 'var(--font-family)' }}>
              <div style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>CareLedger Hospital</h3>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{selectedRx.doctorName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Registered Medical Practitioner</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="tabular-nums" style={{ fontWeight: 700 }}>{selectedRx.id}</div>
                    <div className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{selectedRx.date}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem', fontSize: '0.9rem', background: '#f8fafc', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div><strong>Patient:</strong> {selectedRx.patientName} (<span className="tabular-nums">{selectedRx.patientId}</span>)</div>
                <div><strong>Diagnosis:</strong> <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{selectedRx.diagnosis}</span></div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem' }}>Prescribed Medication(s):</h4>
                <div className="table-wrapper">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRx.medicines.map((med, idx) => (
                        <tr key={idx}>
                          <td><strong>{med.name}</strong></td>
                          <td className="tabular-nums">{med.dosage}</td>
                          <td>{med.frequency}</td>
                          <td className="tabular-nums">{med.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {selectedRx.notes && (
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text)', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
                  <strong>Doctor's Advice:</strong> {selectedRx.notes}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedRx(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                Print Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
