import { useState } from 'react';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function ReceptionistBilling() {
  const [bills, setBills] = useState(() => DataStore.getBills());
  const [patients] = useState(() => DataStore.getPatients());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [notice, setNotice] = useState(null);

  const [formData, setFormData] = useState({
    patientId: patients[0]?.id || '',
    items: [
      { description: 'Outpatient Consultation Fee', amount: 500 }
    ],
    status: 'Paid',
    paymentMethod: 'Cash'
  });

  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', amount: 0 }]
    });
  };

  const updateItem = (index, field, value) => {
    const updated = [...formData.items];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setFormData({ ...formData, items: updated });
  };

  const removeItem = (index) => {
    if (formData.items.length === 1) return;
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  const handleCreateBill = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === formData.patientId);
    if (!patient) return;

    const total = calculateTotal();
    const newBill = DataStore.addBill({
      patientId: patient.id,
      patientName: patient.fullName,
      items: formData.items.filter(it => it.description && it.amount > 0),
      totalAmount: total,
      status: formData.status,
      paymentMethod: formData.status === 'Paid' ? formData.paymentMethod : null
    });

    setBills(DataStore.getBills());
    setShowCreateModal(false);
    setSelectedBill(newBill);
    setNotice(`Invoice #${newBill.id} generated for ${patient.fullName} (Total: ₹${total}).`);
  };

  const handleCollect = (id, method) => {
    DataStore.markBillAsPaid(id, method);
    setBills(DataStore.getBills());
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Front Desk Cashier & Billing Counter</h1>
          <p className="page-header-desc">Generate medical invoices, process payment collections, and issue receipts</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowCreateModal(true)}>
          + Generate New Invoice
        </button>
      </div>

      {notice && (
        <div className="alert alert-success">
          <span>{notice}</span>
          <button className="btn btn-secondary btn-sm" onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      )}

      {/* Bills Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Services & Fees</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
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
                    {bill.status} {bill.paymentMethod ? `(${bill.paymentMethod})` : ''}
                  </span>
                </td>
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
                        onClick={() => handleCollect(bill.id, 'Cash')}
                      >
                        Collect Cash
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Bill Modal */}
      {showCreateModal && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '650px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Generate Patient Medical Bill</h2>
              <button className="modal-close" onClick={() => setShowCreateModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleCreateBill}>
              <div className="modal-body">
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
                        {p.fullName} ({p.id}), {p.contactNumber}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
                    Itemized Billing Charges
                  </label>
                  {formData.items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Service / Test name (e.g. ECG, Consultation, Dressing)"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        required
                        style={{ flex: 3 }}
                      />
                      <input
                        type="number"
                        className="form-input tabular-nums"
                        placeholder="Amount"
                        value={item.amount}
                        onChange={(e) => updateItem(index, 'amount', e.target.value)}
                        required
                        style={{ flex: 1 }}
                      />
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => removeItem(index)}
                        title="Remove row"
                        aria-label="Remove row"
                      >
                        <CloseIcon size={12} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={addItemRow}
                    style={{ marginTop: '0.25rem' }}
                  >
                    + Add Charge Row
                  </button>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#f8fafc',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{ fontWeight: 600 }}>Calculated Total:</span>
                  <span className="tabular-nums" style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    ₹{calculateTotal()}
                  </span>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Payment Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Paid">Paid at Counter</option>
                      <option value="Pending">Pending / Unpaid</option>
                    </select>
                  </div>

                  {formData.status === 'Paid' && (
                    <div className="form-group">
                      <label className="form-label">Payment Mode</label>
                      <select
                        className="form-select"
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      >
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI / QR</option>
                        <option value="Card">Debit / Credit Card</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Generate Bill & Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Receipt Modal */}
      {selectedBill && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Receipt: {selectedBill.id}</h2>
              <button className="modal-close" onClick={() => setSelectedBill(null)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ borderBottom: '2px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>CareLedger Hospital</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Front Desk Cashier Counter</div>
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
                      <th>Service</th>
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
                      <td>Total Paid</td>
                      <td className="tabular-nums" style={{ textAlign: 'right', color: 'var(--color-primary)' }}>
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
                Print Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
