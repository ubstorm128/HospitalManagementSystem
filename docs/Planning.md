# Project Planning — Hospital Management System

## 1. Problem Statement

Many hospitals and small healthcare clinics still rely on manual records or disconnected software systems to manage patients, appointments, prescriptions, and billing. These methods often result in duplicate records, scheduling conflicts, delayed services, and difficulty accessing patient information.

This problem is experienced by hospital administrators, doctors, receptionists, and patients, who all depend on quick and accurate access to records to deliver and receive timely care. It needs to be solved because manual processes slow down hospital operations, increase the chance of errors, and reduce the overall quality of patient care.

## 2. Project Objective

To develop a secure and efficient Hospital Management System that digitizes hospital operations — covering patients, doctors, appointments, prescriptions, and billing — through an integrated web-based platform, while providing role-based access for different types of users.

## 3. Stakeholders

| Role | Responsibilities |
|---|---|
| Administrator | Manages doctors, patients, appointments, billing, users, and overall system settings |
| Doctor | Views appointments, manages patient records, prescribes medication, updates consultation details |
| Receptionist (optional) | Registers patients, schedules appointments, manages billing records |
| Patient | Views appointments, prescriptions, medical history, and personal profile |

## 4. Project Scope

### Included Features

- User Login & Role-Based Access (Admin, Doctor, Receptionist, Patient)
- Patient Management (register, update, search, view profile)
- Doctor Management (add, update, specialization, schedule)
- Appointment Management (book, reschedule, cancel, view schedule)
- Prescription Management (create, update, view history)
- Billing Management (generate bills, update payment status, reports)
- Dashboard with appointment, patient, and revenue statistics

### Excluded Features (Out of Scope for Current Semester)

- Mobile application
- AI-based diagnosis features
- Real payment gateway integration (a simulated payment flow only, if implemented)
- Third-party integrations (e.g. laboratory or pharmacy systems) — reserved for future scalability

## 5. Functional Requirements

- User registration and login (JWT authentication)
- Role-based authorization for Admin, Doctor, Receptionist, and Patient
- Add, update, delete, and search patient records
- Add, update, and delete doctor profiles and specializations
- Book, reschedule, and cancel appointments
- View daily/upcoming appointment schedules
- Create and update prescriptions, and view prescription history
- Generate bills and update payment status
- View billing and revenue reports

## 6. Non-Functional Requirements

| Requirement | Description |
|---|---|
| Security | Password hashing, JWT authentication, role-based authorization, input validation |
| Performance | Fast patient search and responsive API communication |
| Reliability | Consistent and accurate handling of medical and billing records |
| Usability | Easy navigation and a user-friendly appointment workflow |
| Scalability | Architecture supports future modules such as lab reports, pharmacy management, and online consultations |
| Maintainability | Modular application architecture with reusable React components and organized backend code |

## 7. Project Summary

| | |
|---|---|
| **Project Title** | Hospital Management System |
| **Problem Statement** | Manual, disconnected hospital record-keeping causes duplicate records, scheduling conflicts, and delayed access to patient information |
| **Objective** | Digitize hospital operations through a secure, role-based MERN web application |
| **Target Users** | Administrator, Doctor, Receptionist, Patient |
| **Core Modules** | User Management, Patient Management, Doctor Management, Appointment Management, Prescription Management, Billing Management |
| **Scope** | Core hospital workflow (patients, doctors, appointments, prescriptions, billing) for the current semester; mobile app, AI features, and a real payment gateway are deferred for future phases |
| **Expected Outcome** | A working, secure web application that streamlines hospital operations and improves patient management |