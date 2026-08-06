# Navigation Flow — Hospital Management System

## Administrator

```mermaid
graph TD
    Login --> Dashboard
    Dashboard --> Doctors
    Dashboard --> Patients
    Dashboard --> Appointments
    Dashboard --> Billing
    Dashboard --> Reports
    Dashboard --> Users
    Dashboard --> Settings
```

## Doctor

```mermaid
graph TD
    Login --> Dashboard
    Dashboard --> MyAppointments[My Appointments]
    Dashboard --> PatientRecords[Patient Records]
    Dashboard --> Prescriptions
    Dashboard --> Profile
```

## Receptionist

```mermaid
graph TD
    Login --> Dashboard
    Dashboard --> RegisterPatient[Register Patient]
    Dashboard --> AppointmentScheduling[Appointment Scheduling]
    Dashboard --> Billing
    Dashboard --> Profile
```

## Patient

```mermaid
graph TD
    Login --> Dashboard
    Dashboard --> MyAppointments[My Appointments]
    Dashboard --> Prescriptions
    Dashboard --> BillingHistory[Billing History]
    Dashboard --> Profile
```