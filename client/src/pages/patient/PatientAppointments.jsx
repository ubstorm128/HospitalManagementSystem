import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DataStore } from '../../services/dataStore';
import { CloseIcon } from '../../components/ui/Icons';

export default function PatientAppointments() {
  const { currentUser } = useAuth();
  const patients = DataStore.getPatients();
  const doctors = DataStore.getDoctors();
  const [appointments, setAppointments] = useState(() => DataStore.getAppointments());
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState(null);

  const patient = patients.find(p => p.email.toLowerCase() === currentUser?.email.toLowerCase()) || patients[0];
  const myAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName === patient.fullName);

  const [formData, setFormData] = useState({
    doctorId: doctors[0]?.id || '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    reason: ''
  });

  const handleBook = (e) => {
    e.preventDefault();
    const doctor = doctors.find(d => d.id === formData.doctorId);
    if (!doctor) return;

    const newAppt = DataStore.addAppointment({
      patientId: patient.id,
      patientName: patient.fullName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.specialization,
      room: doctor.opdRoom,
      date: formData.date,
      time: formData.time,
      reason: formData.reason || 'Patient self-booked consultation'
    });

    setAppointments(DataStore.getAppointments());
    setShowModal(false);
    setNotice(`Appointment request submitted! Scheduled with ${doctor.name} on ${newAppt.date} at ${newAppt.time}.`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-header-title">My Hospital Appointments</h1>
          <p className="page-header-desc">Track your scheduled doctor visits, room locations, and consultation statuses</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          + Book New Appointment
        </button>
      </div>

      {notice && (
        <div className="alert alert-success">
          <span>{notice}</span>
          <button className="btn btn-secondary btn-sm" onClick={() => setNotice(null)}>Dismiss</button>
        </div>
      )}

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Appt ID</th>
              <th>Doctor</th>
              <th>Specialty / Department</th>
              <th>Room</th>
              <th>Date & Time</th>
              <th>Reason for Visit</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myAppointments.map((apt) => (
              <tr key={apt.id}>
                <td className="tabular-nums" style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                  {apt.id}
                </td>
                <td><strong>{apt.doctorName}</strong></td>
                <td>{apt.department}</td>
                <td className="tabular-nums" style={{ fontWeight: 600 }}>{apt.room}</td>
                <td className="tabular-nums">
                  <div>{apt.date}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{apt.time}</div>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{apt.reason}</td>
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

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content" data-ui="dialog">
            <div className="modal-header">
              <h2 className="modal-title">Book an OPD Appointment</h2>
              <button className="modal-close" onClick={() => setShowModal(false)} aria-label="Close">
                <CloseIcon />
              </button>
            </div>
            <form onSubmit={handleBook}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Select Specialist Doctor <span className="req">*</span></label>
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
                    <label className="form-label">Preferred Date <span className="req">*</span></label>
                    <input
                      type="date"
                      className="form-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Preferred Time Slot <span className="req">*</span></label>
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
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Reason for Visit / Symptoms</label>
                  <textarea
                    className="form-textarea"
                    rows="2"
                    placeholder="Briefly state your symptoms or reason for consulting the doctor"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
