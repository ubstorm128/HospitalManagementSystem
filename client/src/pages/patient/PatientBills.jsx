import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function PatientBills() {
  const { currentUser } = useAuth();
  const patients = DataStore.getPatients();
  const bills = DataStore.getBills();
  const [selectedBill, setSelectedBill] = useState(null);

  const patient = patients.find(p => p.email.toLowerCase() === currentUser?.email.toLowerCase()) || patients[0];
  const myBills = bills.filter(b => b.patientId === patient.id || b.patientName === patient.fullName);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">My Invoices & Payment Receipts</h1>
          <p className="page-header-desc">Review itemized hospital service charges, consultation receipts, and settlement statuses</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Services Rendered</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Payment Mode</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((b) => (
              <tr key={b.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {b.id}
                </td>
                <td className="tabular-nums">{b.date}</td>
                <td style={{ fontSize: '0.85rem' }}>
                  {b.items.map((it, idx) => (
                    <div key={idx}>
                      • {it.description} (<span className="tabular-nums">₹{it.amount}</span>)
                    </div>
                  ))}
                </td>
                <td className="tabular-nums" style={{ fontWeight: 700, fontSize: '1rem' }}>
                  ₹{b.totalAmount}
                </td>
                <td>
                  <span className={`badge ${b.status === 'Paid' ? 'badge-paid' : 'badge-pending'}`}>
                    {b.status}
                  </span>
                </td>
                <td>{b.paymentMethod || 'Pending'}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedBill(b)}
                  >
                    View Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Printable Receipt Modal */}
      {selectedBill && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Payment Receipt: {selectedBill.id}</h2>
              <button className="modal-close" onClick={() => setSelectedBill(null)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>CareLedger Hospital</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Official Patient Billing Slip</div>
              </div>

              <div style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
                <div><strong>Patient:</strong> {selectedBill.patientName} ({selectedBill.patientId})</div>
                <div><strong>Date:</strong> {selectedBill.date}</div>
                <div><strong>Status:</strong> {selectedBill.status} {selectedBill.paymentMethod ? `via ${selectedBill.paymentMethod}` : ''}</div>
              </div>

              <div className="table-wrapper" style={{ marginBottom: '1rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Service Description</th>
                      <th style={{ textAlign: 'right' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.description}</td>
                        <td className="tabular-nums" style={{ textAlign: 'right' }}>₹{it.amount}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                      <td>Total Billed</td>
                      <td className="tabular-nums" style={{ textAlign: 'right', color: 'var(--color-primary)', fontSize: '1.05rem' }}>
                        ₹{selectedBill.totalAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedBill(null)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => window.print()}>
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
