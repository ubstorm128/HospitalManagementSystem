import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function ReceptionistAppointments() {
  const location = useLocation();
  const prefill = location.state?.prefillPatient;

  const [appointments, setAppointments] = useState(() => DataStore.getAppointments());
  const [patients] = useState(() => DataStore.getPatients());
  const [doctors] = useState(() => DataStore.getDoctors());
  const [showBookingModal, setShowBookingModal] = useState(Boolean(prefill));
  const [notice, setNotice] = useState(null);

  const [formData, setFormData] = useState({
    patientId: prefill?.id || (patients[0]?.id || ''),
    doctorId: doctors[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    reason: ''
  });

  useEffect(() => {
    if (prefill) {
      setFormData(prev => ({
        ...prev,
        patientId: prefill.id
      }));
      setShowBookingModal(true);
    }
  }, [prefill]);

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === formData.patientId);
    const doctor = doctors.find(d => d.id === formData.doctorId);

    if (!patient || !doctor) return;

    const newAppt = DataStore.addAppointment({
      patientId: patient.id,
      patientName: patient.fullName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.specialization,
      room: doctor.opdRoom,
      date: formData.date,
      time: formData.time,
      reason: formData.reason || 'General Outpatient Consultation'
    });

    setAppointments(DataStore.getAppointments());
    setShowBookingModal(false);
    setNotice(`Appointment #${newAppt.id} successfully booked for ${patient.fullName} with ${doctor.name} at ${newAppt.time}.`);
  };

  const handleCheckIn = (id) => {
    DataStore.updateAppointmentStatus(id, 'Confirmed');
    setAppointments(DataStore.getAppointments());
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Outpatient Appointment Booking Desk</h1>
          <p className="page-header-desc">Schedule walk-in and booked consultations across doctor departments</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowBookingModal(true)}>
          + Book New Appointment
        </button>
      </div>

      {notice && (
        <div className="alert alert-success">
          <span>{notice}</span>
          <button className="btn btn-secondary btn-sm" onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      )}

      {/* Appointment Master List */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Appt ID</th>
              <th>Patient Details</th>
              <th>Assigned Doctor</th>
              <th>Department / Room</th>
              <th>Scheduled Slot</th>
              <th>Chief Complaint</th>
              <th>Status</th>
              <th>Reception Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {apt.id}
                </td>
                <td>
                  <strong>{apt.patientName}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>ID: {apt.patientId}</div>
                </td>
                <td>{apt.doctorName}</td>
                <td>
                  <div>{apt.department}</div>
                  <div className="tabular-nums" style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{apt.room}</div>
                </td>
                <td className="tabular-nums">
                  <div>{apt.date}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{apt.time}</div>
                </td>
                <td style={{ fontSize: '0.85rem', maxWidth: '200px' }}>{apt.reason}</td>
                <td>
                  <span className={`badge ${
                    apt.status === 'Confirmed' ? 'badge-confirmed' :
                    apt.status === 'Completed' ? 'badge-completed' :
                    apt.status === 'Cancelled' ? 'badge-cancelled' : 'badge-scheduled'
                  }`}>
                    {apt.status}
                  </span>
                </td>
                <td>
                  {apt.status === 'Scheduled' && (
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                      onClick={() => handleCheckIn(apt.id)}
                    >
                      Check-In
                    </button>
                  )}
                  {apt.status === 'Confirmed' && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-success)', fontWeight: 600 }}>In Queue</span>
                  )}
                  {apt.status === 'Completed' && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Concluded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog">
            <div className="modal-header">
              <h2 className="modal-title">Book Outpatient Consultation</h2>
              <button className="modal-close" onClick={() => setShowBookingModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleBookAppointment}>
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

                <div className="form-group">
                  <label className="form-label">Select Doctor & Department <span className="req">*</span></label>
                  <select
                    className="form-select"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    required
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name}, {d.specialization} ({d.opdRoom}, Fee: ₹{d.fee})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Appointment Date <span className="req">*</span></label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time Slot <span className="req">*</span></label>
                    <select
                      className="form-select"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason / Symptoms</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    placeholder="Brief description of patient's chief complaint"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowBookingModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
