# Database Design — Hospital Management System

MongoDB collections and their key fields.

## Users

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| name | String | Full name of the user |
| email | String | Login email (unique) |
| passwordHash | String | Bcrypt-hashed password |
| role | String | `admin` \| `doctor` \| `receptionist` \| `patient` |
| createdAt | Date | Account creation timestamp |

## Patients

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| userId | ObjectId | Reference to `Users` |
| name | String | Patient's full name |
| age | Number | Patient's age |
| gender | String | Patient's gender |
| contact | String | Phone number |
| address | String | Residential address |
| medicalHistory | Array | Past conditions / notes |

## Doctors

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| userId | ObjectId | Reference to `Users` |
| name | String | Doctor's full name |
| specialization | String | Medical specialization |
| department | String | Assigned department |
| schedule | Array | Available time slots |
| contact | String | Phone number |

## Appointments

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| patientId | ObjectId | Reference to `Patients` |
| doctorId | ObjectId | Reference to `Doctors` |
| date | Date | Appointment date |
| time | String | Appointment time |
| status | String | `pending` \| `confirmed` \| `completed` \| `cancelled` |
| reason | String | Reason for visit |

## Prescriptions

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| appointmentId | ObjectId | Reference to `Appointments` |
| doctorId | ObjectId | Reference to `Doctors` |
| patientId | ObjectId | Reference to `Patients` |
| medicines | Array | Prescribed medicines and dosage |
| notes | String | Consultation notes |
| date | Date | Prescription date |

## Bills

| Field | Type | Description |
|---|---|---|
| _id | ObjectId | Unique identifier |
| patientId | ObjectId | Reference to `Patients` |
| appointmentId | ObjectId | Reference to `Appointments` |
| amount | Number | Total billed amount |
| paymentStatus | String | `pending` \| `paid` |
| date | Date | Billing date |