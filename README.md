<div align="center">

# 🏥 Hospital Management System

**A centralized platform to digitize hospital operations — patients, doctors, appointments, prescriptions, and billing.**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

![Status](https://img.shields.io/badge/status-in%20development-yellow?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

</div>

---

## 📌 Problem Statement

Many hospitals and small healthcare clinics still rely on manual records or disconnected software systems to manage patients, appointments, prescriptions, and billing. These outdated methods often result in duplicate records, scheduling conflicts, and difficulty accessing patient information.

This problem is experienced directly by **hospital administrators, doctors, receptionists, and patients**, who all depend on quick and accurate access to records to deliver and receive timely care. Manual processes slow down hospital operations, increase the chance of human error, and reduce the overall quality of patient care.

## 🎯 Objective

To develop a secure, web-based Hospital Management System using the **MERN Stack** that centralizes management of patients, doctors, appointments, prescriptions, and billing — replacing manual/paper-based hospital workflows with a secure, role-based digital platform.

## 📋 Project Brief

The system provides a centralized platform for managing patients, doctors, appointments, medical records, prescriptions, and billing. It supports **role-based access** across four user types — Administrator, Doctor, Receptionist, and Patient — each seeing only the modules relevant to them.

Backend modules include User Management, Patient Management, Doctor Management, Appointment Management, Prescription Management, and Billing Management, exposed through REST APIs and backed by **six MongoDB collections**: `Users`, `Patients`, `Doctors`, `Appointments`, `Prescriptions`, and `Bills`.

### 🧩 Core Modules

| Module | Responsibilities |
|---|---|
| 👤 User Management | Registration, login, role management, profile |
| 🧑‍⚕️ Patient Management | Register, update, search, medical history |
| 🩺 Doctor Management | Add/update doctors, specialization, schedule |
| 📅 Appointment Management | Book, reschedule, cancel, view schedule |
| 💊 Prescription Management | Create, update, view prescription history |
| 💳 Billing Management | Generate bills, update payment status, reports |

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT + Role-Based Authorization |
| Version Control | Git & GitHub |

## 📂 Project Structure

```
HospitalManagementSystem/
│
├── client/     # React frontend
├── server/     # Node.js/Express backend
├── docs/       # Documentation, diagrams, reports
├── README.md
└── .gitignore
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/ubstorm128/HospitalManagementSystem.git
cd HospitalManagementSystem
```

Create a `.env` file inside `server/` with your MongoDB URI, JWT secret, and port before running the app.

### Backend
```bash
cd server
npm install
npm run dev
```
Runs on **http://localhost:5000**

### Frontend
```bash
cd client
npm install
npm run dev
```
Runs on **http://localhost:5173**

## 👥 Team Members

| Name | Role |
|---|---|
| Tam Kapa | — |
| Udit Bora | Developer |
| Dawman Comfield Laskor | Developer |
| Tusanta Teron | — |
| Monojyoti Dey | — |

> ⚠️ Verify spelling of names above and fill in roles.

## 📄 License

This project is developed for academic purposes as part of the BCA coursework at Assam Down Town University.

---

<div align="center">
Made with ❤️ for better healthcare management.
</div>
