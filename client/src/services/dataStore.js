// ============================================================================
// Clinical Data Store & Lifecycle State Manager
// Provides centralized state with localStorage persistence across all portals
// ============================================================================

const STORAGE_KEYS = {
  PATIENTS: 'hms_patients',
  DOCTORS: 'hms_doctors',
  APPOINTMENTS: 'hms_appointments',
  PRESCRIPTIONS: 'hms_prescriptions',
  BILLS: 'hms_bills',
  USERS: 'hms_users'
};

const INITIAL_DOCTORS = [
  {
    id: 'DOC-101',
    name: 'Dr. Rajesh Sharma',
    email: 'doctor.sharma@hospital.com',
    specialization: 'Cardiology',
    department: 'Cardiology',
    qualification: 'MD, DM (Cardiology)',
    opdRoom: 'Room 102',
    schedule: 'Mon - Fri, 09:00 - 14:00',
    fee: 500,
    status: 'Available'
  },
  {
    id: 'DOC-102',
    name: 'Dr. Priya Nair',
    email: 'doctor.nair@hospital.com',
    specialization: 'Pediatrics',
    department: 'Pediatrics',
    qualification: 'MD (Pediatrics)',
    opdRoom: 'Room 204',
    schedule: 'Mon - Sat, 10:00 - 15:00',
    fee: 500,
    status: 'Available'
  },
  {
    id: 'DOC-103',
    name: 'Dr. Amit Roy',
    email: 'doctor.roy@hospital.com',
    specialization: 'Orthopedics',
    department: 'Orthopedics',
    qualification: 'MS (Orthopedics)',
    opdRoom: 'Room 105',
    schedule: 'Tue - Sat, 11:00 - 16:00',
    fee: 600,
    status: 'In Consultation'
  },
  {
    id: 'DOC-104',
    name: 'Dr. Sunita Sen',
    email: 'doctor.sen@hospital.com',
    specialization: 'Neurology',
    department: 'Neurology',
    qualification: 'MD, DM (Neurology)',
    opdRoom: 'Room 301',
    schedule: 'Mon - Thu, 09:00 - 13:00',
    fee: 800,
    status: 'Available'
  }
];

const INITIAL_PATIENTS = [
  {
    id: 'PT-1001',
    fullName: 'John Doe',
    dob: '1990-05-14',
    age: 34,
    gender: 'Male',
    contactNumber: '9876543210',
    email: 'patient@hospital.com',
    address: 'Uzanbazar, Guwahati, Assam',
    bloodGroup: 'O+',
    emergencyName: 'Mary Doe',
    emergencyNumber: '9876543211',
    registeredAt: '2026-03-10'
  },
  {
    id: 'PT-1002',
    fullName: 'Anita Barua',
    dob: '1982-11-20',
    age: 42,
    gender: 'Female',
    contactNumber: '9812345678',
    email: 'anita.b@gmail.com',
    address: 'Zoo Road, Guwahati, Assam',
    bloodGroup: 'B+',
    emergencyName: 'Ramen Barua',
    emergencyNumber: '9812345679',
    registeredAt: '2026-03-15'
  },
  {
    id: 'PT-1003',
    fullName: 'Rahul Kalita',
    dob: '1996-08-04',
    age: 28,
    gender: 'Male',
    contactNumber: '9701234567',
    email: 'rahul.k@gmail.com',
    address: 'Sixmile, Khanapara, Assam',
    bloodGroup: 'A+',
    emergencyName: 'Pranab Kalita',
    emergencyNumber: '9701234568',
    registeredAt: '2026-03-18'
  },
  {
    id: 'PT-1004',
    fullName: 'Meera Das',
    dob: '1959-02-12',
    age: 65,
    gender: 'Female',
    contactNumber: '9654321098',
    email: 'meera.das@outlook.com',
    address: 'Dispur Capital Complex, Assam',
    bloodGroup: 'AB-',
    emergencyName: 'Gaurav Das',
    emergencyNumber: '9654321099',
    registeredAt: '2026-03-20'
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'APP-201',
    patientId: 'PT-1001',
    patientName: 'John Doe',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Rajesh Sharma',
    department: 'Cardiology',
    room: 'Room 102',
    date: '2026-10-17',
    time: '10:30 AM',
    reason: 'Routine cardiac follow-up and BP evaluation',
    status: 'Confirmed'
  },
  {
    id: 'APP-202',
    patientId: 'PT-1002',
    patientName: 'Anita Barua',
    doctorId: 'DOC-102',
    doctorName: 'Dr. Priya Nair',
    department: 'Pediatrics',
    room: 'Room 204',
    date: '2026-10-17',
    time: '11:15 AM',
    reason: 'Child seasonal allergy checkup',
    status: 'Scheduled'
  },
  {
    id: 'APP-203',
    patientId: 'PT-1003',
    patientName: 'Rahul Kalita',
    doctorId: 'DOC-103',
    doctorName: 'Dr. Amit Roy',
    department: 'Orthopedics',
    room: 'Room 105',
    date: '2026-10-16',
    time: '12:00 PM',
    reason: 'Right knee pain after sports activity',
    status: 'Completed'
  },
  {
    id: 'APP-204',
    patientId: 'PT-1004',
    patientName: 'Meera Das',
    doctorId: 'DOC-104',
    doctorName: 'Dr. Sunita Sen',
    department: 'Neurology',
    room: 'Room 301',
    date: '2026-10-18',
    time: '09:30 AM',
    reason: 'Migraine and chronic vertigo assessment',
    status: 'Scheduled'
  }
];

const INITIAL_PRESCRIPTIONS = [
  {
    id: 'RX-301',
    appointmentId: 'APP-201',
    patientId: 'PT-1001',
    patientName: 'John Doe',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Rajesh Sharma',
    date: '2026-10-17',
    diagnosis: 'Stage 1 Essential Hypertension',
    medicines: [
      { name: 'Telmisartan', dosage: '40 mg', frequency: 'Once daily (Morning)', duration: '30 Days' },
      { name: 'Atorvastatin', dosage: '10 mg', frequency: 'Once daily (Bedtime)', duration: '30 Days' }
    ],
    notes: 'Maintain low-sodium diet (<2g/day). 30 mins brisk morning walk. Review BP log in 4 weeks.'
  },
  {
    id: 'RX-302',
    appointmentId: 'APP-203',
    patientId: 'PT-1003',
    patientName: 'Rahul Kalita',
    doctorId: 'DOC-103',
    doctorName: 'Dr. Amit Roy',
    date: '2026-10-16',
    diagnosis: 'Mild Lateral Knee Ligament Strain',
    medicines: [
      { name: 'Aceclofenac + Paracetamol', dosage: '100mg / 325mg', frequency: 'Twice daily after meals', duration: '5 Days' },
      { name: 'Pantoprazole', dosage: '40 mg', frequency: 'Once daily empty stomach', duration: '5 Days' }
    ],
    notes: 'Apply cold pack twice daily. Avoid high-impact running for 10 days. Knee brace recommended during walking.'
  }
];

const INITIAL_BILLS = [
  {
    id: 'INV-401',
    patientId: 'PT-1001',
    patientName: 'John Doe',
    appointmentId: 'APP-201',
    date: '2026-10-17',
    items: [
      { description: 'Cardiology Consultation (Dr. Rajesh Sharma)', amount: 500 },
      { description: '12-Lead Diagnostic ECG', amount: 300 }
    ],
    totalAmount: 800,
    status: 'Paid',
    paymentMethod: 'UPI'
  },
  {
    id: 'INV-402',
    patientId: 'PT-1002',
    patientName: 'Anita Barua',
    appointmentId: 'APP-202',
    date: '2026-10-17',
    items: [
      { description: 'Pediatric Consultation (Dr. Priya Nair)', amount: 500 },
      { description: 'Complete Blood Count (CBC) Panel', amount: 450 }
    ],
    totalAmount: 950,
    status: 'Pending',
    paymentMethod: null
  },
  {
    id: 'INV-403',
    patientId: 'PT-1003',
    patientName: 'Rahul Kalita',
    appointmentId: 'APP-203',
    date: '2026-10-16',
    items: [
      { description: 'Orthopedic Consultation (Dr. Amit Roy)', amount: 600 },
      { description: 'Digital X-Ray Knee (AP / Lateral View)', amount: 700 }
    ],
    totalAmount: 1300,
    status: 'Paid',
    paymentMethod: 'Cash'
  },
  {
    id: 'INV-404',
    patientId: 'PT-1004',
    patientName: 'Meera Das',
    appointmentId: 'APP-204',
    date: '2026-10-17',
    items: [
      { description: 'Neurology Consultation (Dr. Sunita Sen)', amount: 800 }
    ],
    totalAmount: 800,
    status: 'Pending',
    paymentMethod: null
  }
];

const INITIAL_USERS = [
  { id: 'USR-01', name: 'Administrator Udit', email: 'admin@hospital.com', password: 'admin', role: 'admin' },
  { id: 'USR-02', name: 'Rima Barman (Reception)', email: 'reception@hospital.com', password: 'reception', role: 'receptionist' },
  { id: 'USR-03', name: 'Dr. Rajesh Sharma', email: 'doctor.sharma@hospital.com', password: 'doctor', role: 'doctor' },
  { id: 'USR-04', name: 'John Doe (Patient)', email: 'patient@hospital.com', password: 'patient', role: 'patient' }
];

// Helper to get or seed storage
function getStored(key, initialData) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key}:`, err);
    return initialData;
  }
}

function setStored(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key}:`, err);
  }
}

export const DataStore = {
  // --- Doctors ---
  getDoctors() {
    return getStored(STORAGE_KEYS.DOCTORS, INITIAL_DOCTORS);
  },
  addDoctor(doctor) {
    const doctors = this.getDoctors();
    const newDoc = {
      ...doctor,
      id: `DOC-${100 + doctors.length + 1}`,
      status: doctor.status || 'Available'
    };
    doctors.unshift(newDoc);
    setStored(STORAGE_KEYS.DOCTORS, doctors);
    return newDoc;
  },

  // --- Patients ---
  getPatients() {
    return getStored(STORAGE_KEYS.PATIENTS, INITIAL_PATIENTS);
  },
  getPatientById(id) {
    return this.getPatients().find(p => p.id === id);
  },
  addPatient(patient) {
    const patients = this.getPatients();
    const newPatient = {
      ...patient,
      id: `PT-${1000 + patients.length + 1}`,
      registeredAt: new Date().toISOString().split('T')[0]
    };
    patients.unshift(newPatient);
    setStored(STORAGE_KEYS.PATIENTS, patients);
    return newPatient;
  },

  // --- Appointments ---
  getAppointments() {
    return getStored(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
  },
  addAppointment(appointment) {
    const appts = this.getAppointments();
    const newAppt = {
      ...appointment,
      id: `APP-${200 + appts.length + 1}`,
      status: 'Confirmed'
    };
    appts.unshift(newAppt);
    setStored(STORAGE_KEYS.APPOINTMENTS, appts);
    return newAppt;
  },
  updateAppointmentStatus(id, status) {
    const appts = this.getAppointments().map(a => a.id === id ? { ...a, status } : a);
    setStored(STORAGE_KEYS.APPOINTMENTS, appts);
    return appts.find(a => a.id === id);
  },

  // --- Prescriptions ---
  getPrescriptions() {
    return getStored(STORAGE_KEYS.PRESCRIPTIONS, INITIAL_PRESCRIPTIONS);
  },
  addPrescription(prescription) {
    const rxList = this.getPrescriptions();
    const newRx = {
      ...prescription,
      id: `RX-${300 + rxList.length + 1}`,
      date: new Date().toISOString().split('T')[0]
    };
    rxList.unshift(newRx);
    setStored(STORAGE_KEYS.PRESCRIPTIONS, rxList);

    // Also mark corresponding appointment as Completed if applicable
    if (prescription.appointmentId) {
      this.updateAppointmentStatus(prescription.appointmentId, 'Completed');
    }

    return newRx;
  },

  // --- Bills & Invoices ---
  getBills() {
    return getStored(STORAGE_KEYS.BILLS, INITIAL_BILLS);
  },
  addBill(bill) {
    const bills = this.getBills();
    const newBill = {
      ...bill,
      id: `INV-${400 + bills.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      status: bill.status || 'Pending'
    };
    bills.unshift(newBill);
    setStored(STORAGE_KEYS.BILLS, bills);
    return newBill;
  },
  markBillAsPaid(id, paymentMethod = 'Cash') {
    const bills = this.getBills().map(b => b.id === id ? { ...b, status: 'Paid', paymentMethod } : b);
    setStored(STORAGE_KEYS.BILLS, bills);
    return bills.find(b => b.id === id);
  },

  // --- Users & Auth ---
  getUsers() {
    return getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
  },
  addUser(user) {
    const users = this.getUsers();
    const newUser = {
      ...user,
      id: `USR-${users.length + 1}`
    };
    users.push(newUser);
    setStored(STORAGE_KEYS.USERS, users);
    return newUser;
  }
};
