import { useState } from 'react';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function AdminPatients() {
  const [patients] = useState(() => DataStore.getPatients());
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.contactNumber.includes(search) ||
    p.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Master Patient Directory</h1>
          <p className="page-header-desc">Complete central records of registered hospital patients and medical contacts</p>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="search-bar">
          <input
            type="text"
            className="form-input"
            placeholder="Search by patient ID, name, contact, or blood group..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
          Total Registered: {patients.length} | Displaying: {filteredPatients.length}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Full Name</th>
              <th>Age / Gender</th>
              <th>Blood Group</th>
              <th>Contact Number</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((p) => (
              <tr key={p.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {p.id}
                </td>
                <td>
                  <strong>{p.fullName}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{p.email}</div>
                </td>
                <td className="tabular-nums">{p.age} yrs / {p.gender}</td>
                <td>
                  <span className="badge badge-scheduled" style={{ fontWeight: 700 }}>
                    {p.bloodGroup}
                  </span>
                </td>
                <td className="tabular-nums">{p.contactNumber}</td>
                <td className="tabular-nums" style={{ fontSize: '0.85rem' }}>{p.registeredAt}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedPatient(p)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog">
            <div className="modal-header">
              <h2 className="modal-title">Patient Profile: {selectedPatient.id}</h2>
              <button className="modal-close" onClick={() => setSelectedPatient(null)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div className="stat-label">Full Name</div>
                  <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{selectedPatient.fullName}</div>
                </div>
                <div>
                  <div className="stat-label">Blood Group</div>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{selectedPatient.bloodGroup}</div>
                </div>
                <div>
                  <div className="stat-label">Age & Gender</div>
                  <div>{selectedPatient.age} Years, {selectedPatient.gender}</div>
                </div>
                <div>
                  <div className="stat-label">Date of Birth</div>
                  <div className="tabular-nums">{selectedPatient.dob}</div>
                </div>
                <div>
                  <div className="stat-label">Primary Contact</div>
                  <div className="tabular-nums">{selectedPatient.contactNumber}</div>
                </div>
                <div>
                  <div className="stat-label">Email</div>
                  <div>{selectedPatient.email}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div className="stat-label">Residential Address</div>
                <div>{selectedPatient.address}</div>
              </div>

              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <div className="stat-label">Emergency Contact</div>
                <div style={{ fontWeight: 600 }}>{selectedPatient.emergencyName} ({selectedPatient.emergencyNumber})</div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={() => setSelectedPatient(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
