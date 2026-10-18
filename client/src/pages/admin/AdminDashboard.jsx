import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DataStore } from '../../services/dataStore';

export default function AdminDashboard() {
  const patients = DataStore.getPatients();
  const doctors = DataStore.getDoctors();
  const appointments = DataStore.getAppointments();
  const bills = DataStore.getBills();

  const totalRevenue = bills
    .filter(b => b.status === 'Paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const pendingBills = bills.filter(b => b.status === 'Pending').length;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Administrator Console</h1>
          <p className="page-header-desc">Hospital-wide operational KPIs, department status, and clinical ledger records</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/admin/doctors" className="btn btn-primary btn-sm">
            + Manage Doctors
          </Link>
          <Link to="/admin/billing" className="btn btn-secondary btn-sm">
            Financial Ledger
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Total Registered Patients</div>
          <div className="stat-value">{patients.length}</div>
          <div className="stat-meta">Active patient medical records</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Doctors & OPD</div>
          <div className="stat-value">{doctors.length}</div>
          <div className="stat-meta">Across 4 medical departments</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Scheduled Consultations</div>
          <div className="stat-value">{appointments.length}</div>
          <div className="stat-meta">Today's active clinical queue</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Realized Revenue</div>
          <div className="stat-value">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-meta">{pendingBills} invoices pending payment</div>
        </div>
      </div>

      {/* Two Column Operational Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Recent Appointments */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Recent Appointments</h2>
            <Link to="/admin/appointments" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              View All →
            </Link>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 4).map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <strong>{apt.patientName}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{apt.department}</div>
                    </td>
                    <td>{apt.doctorName}</td>
                    <td className="tabular-nums">{apt.time}</td>
                    <td>
                      <span className={`badge ${
                        apt.status === 'Confirmed' ? 'badge-confirmed' :
                        apt.status === 'Completed' ? 'badge-completed' :
                        apt.status === 'Cancelled' ? 'badge-cancelled' : 'badge-scheduled'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctor OPD Departments & Status */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Doctor Roster & Availability</h2>
            <Link to="/admin/doctors" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Manage Roster →
            </Link>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Room</th>
                  <th>OPD Status</th>
                </tr>
              </thead>
              <tbody>
                {doctors.slice(0, 4).map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <strong>{doc.name}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{doc.qualification}</div>
                    </td>
                    <td>{doc.specialization}</td>
                    <td className="tabular-nums">{doc.opdRoom}</td>
                    <td>
                      <span className={`badge ${doc.status === 'Available' ? 'badge-confirmed' : 'badge-pending'}`}>
                        {doc.status === 'Available' ? 'Available' : 'In OPD'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
