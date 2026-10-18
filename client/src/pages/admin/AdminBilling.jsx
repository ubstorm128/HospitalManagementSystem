import { useState } from 'react';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function AdminBilling() {
  const [bills, setBills] = useState(() => DataStore.getBills());
  const [filter, setFilter] = useState('All');
  const [selectedBill, setSelectedBill] = useState(null);

  const handleMarkPaid = (id, method = 'UPI') => {
    DataStore.markBillAsPaid(id, method);
    setBills(DataStore.getBills());
    if (selectedBill && selectedBill.id === id) {
      setSelectedBill({ ...selectedBill, status: 'Paid', paymentMethod: method });
    }
  };

  const totalCollected = bills
    .filter(b => b.status === 'Paid')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const totalPending = bills
    .filter(b => b.status === 'Pending')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const filteredBills = bills.filter(b => filter === 'All' || b.status === filter);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Financial & Billing Ledger</h1>
          <p className="page-header-desc">Hospital invoice records, consultation fee collection, and outstanding payments</p>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Collected Revenue</div>
          <div className="stat-value" style={{ color: 'var(--color-success)' }}>
            ₹{totalCollected.toLocaleString()}
          </div>
          <div className="stat-meta">Verified paid hospital invoices</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Receivables</div>
          <div className="stat-value" style={{ color: 'var(--color-warning)' }}>
            ₹{totalPending.toLocaleString()}
          </div>
          <div className="stat-meta">Outstanding at cashier desk</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Invoices Issued</div>
          <div className="stat-value">{bills.length}</div>
          <div className="stat-meta">Across all medical departments</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['All', 'Paid', 'Pending'].map((status) => (
          <button
            key={status}
            className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(status)}
          >
            {status} Invoices
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Itemized Services</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {bill.id}
                </td>
                <td>
                  <strong>{bill.patientName}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {bill.patientId}</div>
                </td>
                <td className="tabular-nums">{bill.date}</td>
                <td style={{ fontSize: '0.85rem' }}>
                  {bill.items.map((it, idx) => (
                    <div key={idx}>
                      • {it.description} (<span className="tabular-nums">₹{it.amount}</span>)
                    </div>
                  ))}
                </td>
                <td className="tabular-nums" style={{ fontWeight: 700, fontSize: '1rem' }}>
                  ₹{bill.totalAmount}
                </td>
                <td>
                  <span className={`badge ${bill.status === 'Paid' ? 'badge-paid' : 'badge-pending'}`}>
                    {bill.status}
                  </span>
                </td>
                <td>{bill.paymentMethod || 'Pending'}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedBill(bill)}
                    >
                      Receipt
                    </button>
                    {bill.status === 'Pending' && (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleMarkPaid(bill.id, 'Cash')}
                      >
                        Collect
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Receipt Modal */}
      {selectedBill && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Hospital Invoice Receipt</h2>
              <button className="modal-close" onClick={() => setSelectedBill(null)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body" style={{ background: '#ffffff', fontFamily: 'var(--font-family)' }}>
              <div style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ margin: 0, color: 'var(--color-primary)', fontWeight: 700 }}>CareLedger Hospital</h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Central Outpatient Facility</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="tabular-nums" style={{ fontWeight: 700 }}>{selectedBill.id}</div>
                    <div className="tabular-nums" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{selectedBill.date}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                <div><strong>Billed To:</strong> {selectedBill.patientName} ({selectedBill.patientId})</div>
                <div><strong>Status:</strong> {selectedBill.status} {selectedBill.paymentMethod ? `via ${selectedBill.paymentMethod}` : ''}</div>
              </div>

              <div className="table-wrapper" style={{ marginBottom: '1rem' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Service Description</th>
                      <th style={{ textAlign: 'right' }}>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBill.items.map((item, i) => (
                      <tr key={i}>
                        <td>{item.description}</td>
                        <td className="tabular-nums" style={{ textAlign: 'right' }}>₹{item.amount}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#f8fafc', fontWeight: 700 }}>
                      <td>Grand Total</td>
                      <td className="tabular-nums" style={{ textAlign: 'right', fontSize: '1.05rem', color: 'var(--color-primary)' }}>
                        ₹{selectedBill.totalAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {selectedBill.status === 'Pending' && (
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleMarkPaid(selectedBill.id, 'UPI')}
                  >
                    Mark as Paid (UPI)
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleMarkPaid(selectedBill.id, 'Cash')}
                  >
                    Mark as Paid (Cash)
                  </button>
                </div>
              )}
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
