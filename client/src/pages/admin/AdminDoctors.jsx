import { useState } from 'react';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState(() => DataStore.getDoctors());
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: 'Cardiology',
    qualification: '',
    opdRoom: '',
    schedule: 'Mon - Fri, 09:00 - 14:00',
    fee: 500
  });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.qualification || !formData.opdRoom) return;

    const created = DataStore.addDoctor(formData);
    setDoctors(DataStore.getDoctors());
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      specialization: 'Cardiology',
      qualification: '',
      opdRoom: '',
      schedule: 'Mon - Fri, 09:00 - 14:00',
      fee: 500
    });
  };

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization.toLowerCase().includes(search.toLowerCase()) ||
    d.opdRoom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Doctors Roster & OPD Schedules</h1>
          <p className="page-header-desc">Manage clinical specialists, consultation hours, and room assignments</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Add New Doctor
        </button>
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="search-bar">
          <input
            type="text"
            className="form-input"
            placeholder="Search doctor by name, specialty, or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
          Showing {filteredDoctors.length} specialist{filteredDoctors.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Doctor Code</th>
              <th>Doctor Name</th>
              <th>Department / Specialty</th>
              <th>Qualification</th>
              <th>OPD Room</th>
              <th>Consultation Hours</th>
              <th>Fee</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doc) => (
              <tr key={doc.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>
                  {doc.id}
                </td>
                <td>
                  <strong>{doc.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{doc.email}</div>
                </td>
                <td>
                  <span className="badge badge-role">{doc.specialization}</span>
                </td>
                <td>{doc.qualification}</td>
                <td className="tabular-nums" style={{ fontWeight: 600 }}>{doc.opdRoom}</td>
                <td className="tabular-nums" style={{ fontSize: '0.85rem' }}>{doc.schedule}</td>
                <td className="tabular-nums" style={{ fontWeight: 600 }}>₹{doc.fee}</td>
                <td>
                  <span className={`badge ${doc.status === 'Available' ? 'badge-confirmed' : 'badge-pending'}`}>
                    {doc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Doctor Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog">
            <div className="modal-header">
              <h2 className="modal-title">Register New Medical Specialist</h2>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleAddDoctor}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Doctor Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Dr. Ramesh Chaliha"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Specialization <span className="req">*</span></label>
                    <select
                      className="form-select"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Dermatology">Dermatology</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Qualifications <span className="req">*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. MBBS, MD (Medicine)"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">OPD Room Number <span className="req">*</span></label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Room 108"
                      value={formData.opdRoom}
                      onChange={(e) => setFormData({ ...formData, opdRoom: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Consultation Fee (₹) <span className="req">*</span></label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.fee}
                      onChange={(e) => setFormData({ ...formData, fee: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Consultation Schedule</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Doctor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
