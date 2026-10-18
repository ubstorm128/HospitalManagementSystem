import { useState } from 'react';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function AdminUsers() {
  const [users, setUsers] = useState(() => DataStore.getUsers());
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'receptionist'
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) return;

    DataStore.addUser(formData);
    setUsers(DataStore.getUsers());
    setShowModal(false);
    setFormData({ name: '', email: '', password: '', role: 'receptionist' });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">System Users & Role Access (RBAC)</h1>
          <p className="page-header-desc">Manage hospital staff credentials, portal privileges, and account security</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Create User Account
        </button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Assigned Portal Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {u.id}
                </td>
                <td><strong>{u.name}</strong></td>
                <td className="tabular-nums">{u.email}</td>
                <td>
                  <span className={`badge ${
                    u.role === 'admin' ? 'badge-confirmed' :
                    u.role === 'doctor' ? 'badge-scheduled' :
                    u.role === 'receptionist' ? 'badge-pending' : 'badge-role'
                  }`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.85rem' }}>
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog">
            <div className="modal-header">
              <h2 className="modal-title">Create System User Account</h2>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Dr. Bhaben Saikia"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="user@hospital.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Default Password <span className="req">*</span></label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Assigned Role <span className="req">*</span></label>
                  <select
                    className="form-select"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="receptionist">Receptionist (Front Desk)</option>
                    <option value="doctor">Doctor (Clinical Workspace)</option>
                    <option value="admin">Administrator (System Control)</option>
                    <option value="patient">Patient (Patient Portal)</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
