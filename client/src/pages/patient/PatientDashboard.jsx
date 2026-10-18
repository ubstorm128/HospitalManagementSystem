import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';

export default function PatientDashboard() {
  const { currentUser } = useAuth();
  const patients = DataStore.getPatients();
  const appointments = DataStore.getAppointments();
  const prescriptions = DataStore.getPrescriptions();
  const bills = DataStore.getBills();

  // Match logged-in patient by email or default to John Doe (PT-1001)
  const patient = patients.find(p => p.email.toLowerCase() === currentUser?.email.toLowerCase()) || patients[0];

  const myAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName === patient.fullName);
  const myPrescriptions = prescriptions.filter(p => p.patientId === patient.id);
  const myBills = bills.filter(b => b.patientId === patient.id);

  const upcomingAppt = myAppointments.find(a => a.status === 'Confirmed' || a.status === 'Scheduled');
  const latestRx = myPrescriptions[0];
  const pendingBill = myBills.find(b => b.status === 'Pending');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Welcome, {patient.fullName}</h1>
          <p className="page-header-desc">
            Patient Portal • ID: <strong className="tabular-nums">{patient.id}</strong> • Blood Group: <strong style={{ color: 'var(--color-primary)' }}>{patient.bloodGroup}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to="/patient/appointments" className="btn btn-primary btn-sm">
            My Appointments
          </Link>
          <Link to="/patient/prescriptions" className="btn btn-secondary btn-sm">
            View Prescriptions
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Upcoming Appointment</div>
          <div className="stat-value" style={{ fontSize: '1.25rem', color: upcomingAppt ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
            {upcomingAppt ? upcomingAppt.time : 'None Scheduled'}
          </div>
          <div className="stat-meta">
            {upcomingAppt ? `${upcomingAppt.date} • ${upcomingAppt.doctorName}` : 'No active queue'}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Prescriptions</div>
          <div className="stat-value">{myPrescriptions.length}</div>
          <div className="stat-meta">Issued by hospital specialists</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Billing Invoices</div>
          <div className="stat-value">{myBills.length}</div>
          <div className="stat-meta">
            {pendingBill ? (
              <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>1 Invoice Pending</span>
            ) : (
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>All Invoices Settled</span>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Appointment Highlight */}
      {upcomingAppt && (
        <div className="card" style={{ marginBottom: '1.5rem', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-confirmed" style={{ marginBottom: '0.4rem' }}>
                Confirmed OPD Visit
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0' }}>
                {upcomingAppt.doctorName}, {upcomingAppt.department}
              </h2>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Scheduled for <strong className="tabular-nums">{upcomingAppt.date} at {upcomingAppt.time}</strong> • Location: <strong>{upcomingAppt.room}</strong>
              </p>
            </div>
            <Link to="/patient/appointments" className="btn btn-secondary btn-sm">
              View Appointment Details →
            </Link>
          </div>
        </div>
      )}

      {/* Two Column Layout: Latest Prescription & Recent Bills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {/* Latest Prescription */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Recent Prescription</h2>
            <Link to="/patient/prescriptions" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              All Prescriptions →
            </Link>
          </div>
          {latestRx ? (
            <div>
              <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{latestRx.diagnosis}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  By {latestRx.doctorName} on <span className="tabular-nums">{latestRx.date}</span>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                {latestRx.medicines.map((m, idx) => (
                  <div key={idx} style={{ marginBottom: '0.35rem' }}>
                    <strong>{m.name}</strong> ({m.dosage}), {m.frequency}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                Note: {latestRx.notes}
              </div>
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No prescriptions issued yet.</p>
          )}
        </div>

        {/* Recent Invoices */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="card-title">Medical Invoices & Receipts</h2>
            <Link to="/patient/bills" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              All Invoices →
            </Link>
          </div>
          {myBills.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice #</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myBills.slice(0, 3).map((bill) => (
                    <tr key={bill.id}>
                      <td className="tabular-nums" style={{ fontWeight: 600 }}>{bill.id}</td>
                      <td className="tabular-nums">{bill.date}</td>
                      <td className="tabular-nums" style={{ fontWeight: 600 }}>₹{bill.totalAmount}</td>
                      <td>
                        <span className={`badge ${bill.status === 'Paid' ? 'badge-paid' : 'badge-pending'}`}>
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No billing records found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
