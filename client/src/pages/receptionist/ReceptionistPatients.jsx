import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataStore } from '../../services/dataStore';

const initialForm = {
  fullName: '',
  dob: '',
  age: '',
  gender: 'Male',
  contactNumber: '',
  email: '',
  address: '',
  bloodGroup: 'O+',
  emergencyName: '',
  emergencyNumber: ''
};

export default function ReceptionistPatients() {
  const [activeTab, setActiveTab] = useState('directory'); // 'directory' | 'register'
  const [patients, setPatients] = useState(() => DataStore.getPatients());
  const [formData, setFormData] = useState(initialForm);
  const [successNotice, setSuccessNotice] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.contactNumber) return;

    // Calculate age if not filled
    let calculatedAge = formData.age;
    if (!calculatedAge && formData.dob) {
      const birth = new Date(formData.dob);
      const diff = Date.now() - birth.getTime();
      calculatedAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    const created = DataStore.addPatient({
      ...formData,
      age: calculatedAge || 30
    });

    setPatients(DataStore.getPatients());
    setSuccessNotice(created);
    setFormData(initialForm);
  };

  const filtered = patients.filter(p =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.contactNumber.includes(search)
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Patient Intake & Registry Desk</h1>
          <p className="page-header-desc">Search registered hospital patients or register a new walk-in patient</p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            className={`btn btn-sm ${activeTab === 'directory' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('directory')}
          >
            Patient Directory ({patients.length})
          </button>
          <button
            className={`btn btn-sm ${activeTab === 'register' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('register')}
          >
            + Register New Patient
          </button>
        </div>
      </div>

      {successNotice && (
        <div className="alert alert-success" style={{ marginBottom: '1.25rem' }}>
          <div>
            <strong>Patient Intake Complete:</strong> {successNotice.fullName} registered with ID{' '}
            <strong className="tabular-nums">#{successNotice.id}</strong>.
          </div>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              navigate('/receptionist/appointments', { state: { prefillPatient: successNotice } });
            }}
          >
            Book Appointment Now →
          </button>
        </div>
      )}

      {activeTab === 'directory' ? (
        <div>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="search-bar">
              <input
                type="text"
                className="form-input"
                placeholder="Search patient by name, ID, or phone number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
              Showing {filtered.length} matching record{filtered.length === 1 ? '' : 's'}
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
                  <th>Emergency Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      {p.id}
                    </td>
                    <td>
                      <strong>{p.fullName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{p.address}</div>
                    </td>
                    <td className="tabular-nums">{p.age} yrs / {p.gender}</td>
                    <td>
                      <span className="badge badge-scheduled" style={{ fontWeight: 700 }}>
                        {p.bloodGroup}
                      </span>
                    </td>
                    <td className="tabular-nums">{p.contactNumber}</td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {p.emergencyName} (<span className="tabular-nums">{p.emergencyNumber}</span>)
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          navigate('/receptionist/appointments', { state: { prefillPatient: p } });
                        }}
                      >
                        Book OPD
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 className="card-title" style={{ marginBottom: '0.25rem' }}>Walk-In Patient Intake Form</h2>
          <p className="card-desc">Enter the patient's personal and emergency details to issue a patient card</p>

          <form onSubmit={handleRegister}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name <span className="req">*</span></label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Bhaben Baruah"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone Number <span className="req">*</span></label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="10-digit mobile number"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender <span className="req">*</span></label>
                <select
                  className="form-select"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Blood Group <span className="req">*</span></label>
                <select
                  className="form-select"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Residential Address</label>
              <input
                type="text"
                className="form-input"
                placeholder="House / Street / Locality, City, State"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Emergency Contact Person</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name of relative / guardian"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Emergency Phone Number</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="10-digit phone number"
                  value={formData.emergencyNumber}
                  onChange={(e) => setFormData({ ...formData, emergencyNumber: e.target.value })}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setActiveTab('directory')}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Register & Issue Card
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
