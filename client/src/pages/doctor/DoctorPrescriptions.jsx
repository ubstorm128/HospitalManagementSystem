import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function DoctorPrescriptions() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const prefill = location.state?.prefillAppointment;

  const [prescriptions, setPrescriptions] = useState(() => DataStore.getPrescriptions());
  const doctors = DataStore.getDoctors();
  const patients = DataStore.getPatients();

  const doctor = doctors.find(d => d.email.toLowerCase() === currentUser?.email.toLowerCase()) || doctors[0];

  const [activeTab, setActiveTab] = useState(prefill ? 'author' : 'list'); // 'list' | 'author'
  const [selectedRx, setSelectedRx] = useState(null);
  const [notice, setNotice] = useState(null);

  const [formData, setFormData] = useState({
    patientId: prefill?.patientId || (patients[0]?.id || ''),
    appointmentId: prefill?.id || '',
    diagnosis: '',
    medicines: [
      { name: '', dosage: '', frequency: 'Once daily (Morning)', duration: '7 Days' }
    ],
    notes: ''
  });

  useEffect(() => {
    if (prefill) {
      setFormData(prev => ({
        ...prev,
        patientId: prefill.patientId,
        appointmentId: prefill.id,
        diagnosis: prefill.reason || ''
      }));
      setActiveTab('author');
    }
  }, [prefill]);

  const addMedicineRow = () => {
    setFormData({
      ...formData,
      medicines: [...formData.medicines, { name: '', dosage: '', frequency: 'Once daily (Morning)', duration: '7 Days' }]
    });
  };

  const updateMedicine = (index, field, value) => {
    const updated = [...formData.medicines];
    updated[index][field] = value;
    setFormData({ ...formData, medicines: updated });
  };

  const removeMedicineRow = (index) => {
    if (formData.medicines.length === 1) return;
    setFormData({
      ...formData,
      medicines: formData.medicines.filter((_, i) => i !== index)
    });
  };

  const handleSavePrescription = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === formData.patientId);
    if (!patient || !formData.diagnosis.trim()) return;

    const validMeds = formData.medicines.filter(m => m.name.trim());
    if (validMeds.length === 0) {
      alert('Please prescribe at least one medication.');
      return;
    }

    const newRx = DataStore.addPrescription({
      appointmentId: formData.appointmentId || null,
      patientId: patient.id,
      patientName: patient.fullName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      diagnosis: formData.diagnosis,
      medicines: validMeds,
      notes: formData.notes
    });

    setPrescriptions(DataStore.getPrescriptions());
    setSelectedRx(newRx);
    setActiveTab('list');
    setNotice(`Digital Prescription #${newRx.id} created and dispatched to patient chart.`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Digital Prescription Management</h1>
          <p className="page-header-desc">Author and dispatch certified digital prescriptions with structured dosages</p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            className={`btn btn-sm ${activeTab === 'list' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('list')}
          >
            Prescription Records ({prescriptions.length})
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'author' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('author')}
          >
            + Author Prescription
          </button>
        </div>
      </div>

      {notice && (
        <div className="alert alert-success">
          <span>{notice}</span>
          <button className="btn btn-secondary btn-sm" onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      )}

      {activeTab === 'list' ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Rx #</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Clinical Diagnosis</th>
                <th>Prescribed Medications</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((rx) => (
                <tr key={rx.id}>
                  <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                    {rx.id}
                  </td>
                  <td>
                    <strong>{rx.patientName}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {rx.patientId}</div>
                  </td>
                  <td>{rx.doctorName}</td>
                  <td className="tabular-nums">{rx.date}</td>
                  <td style={{ fontWeight: 600 }}>{rx.diagnosis}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {rx.medicines.map((m, i) => (
                      <div key={i}>
                        {m.name} ({m.dosage}), {m.frequency}
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedRx(rx)}
                    >
                      View Rx Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            <h2 className="card-title" style={{ margin: 0 }}>Digital Prescription Authoring</h2>
            <p className="card-desc" style={{ margin: '0.25rem 0 0' }}>
              Prescribing Practitioner: <strong>{doctor.name}</strong>, {doctor.qualification} ({doctor.specialization})
            </p>
          </div>

          <form onSubmit={handleSavePrescription}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Select Patient <span className="req">*</span></label>
                <select
                  className="form-select"
                  value={formData.patientId}
                  onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                  required
                >
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.fullName} ({p.id}), {p.age}y/{p.gender}, Blood: {p.bloodGroup}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Clinical Diagnosis <span className="req">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Acute Bronchitis, Type 2 Diabetes"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  Rx Medications & Dosage Schedule <span className="req">*</span>
                </label>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={addMedicineRow}
                >
                  + Add Drug
                </button>
              </div>

              {formData.medicines.map((med, index) => (
                <div key={index} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 2fr 1fr auto',
                  gap: '0.4rem',
                  marginBottom: '0.5rem',
                  alignItems: 'center'
                }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Medicine name"
                    value={med.name}
                    onChange={(e) => updateMedicine(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Dose (e.g. 500mg)"
                    value={med.dosage}
                    onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                    required
                  />
                  <select
                    className="form-select"
                    value={med.frequency}
                    onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                  >
                    <option value="Once daily (Morning)">Once daily (Morning)</option>
                    <option value="Once daily (Bedtime)">Once daily (Bedtime)</option>
                    <option value="Twice daily after meals">Twice daily after meals</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="SOS (As needed)">SOS (As needed)</option>
                  </select>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Duration"
                    value={med.duration}
                    onChange={(e) => updateMedicine(index, 'duration', e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => removeMedicineRow(index)}
                    title="Remove row"
                    aria-label="Remove row"
                  >
                    <CloseIcon size={12} />
                  </button>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Doctor's Clinical Notes & Dietary Advice</label>
              <textarea
                className="form-textarea"
                rows="3"
                placeholder="Special precautions, diet restrictions, follow-up timeline..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveTab('list')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Issue Prescription & Dispatch
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Prescription Slip Modal */}
      {selectedRx && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog" style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Medical Prescription Slip</h2>
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
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', color: 'var(--color-text)' }}>Prescribed Medications:</h4>
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
