# Entity Relationship Diagram — Hospital Management System

```mermaid
erDiagram
    USERS ||--o| DOCTORS : "is"
    USERS ||--o| PATIENTS : "is"
    DOCTORS ||--o{ APPOINTMENTS : "attends"
    PATIENTS ||--o{ APPOINTMENTS : "books"
    APPOINTMENTS ||--o| PRESCRIPTIONS : "generates"
    APPOINTMENTS ||--o| BILLS : "generates"
    DOCTORS ||--o{ PRESCRIPTIONS : "writes"
    PATIENTS ||--o{ BILLS : "pays"

    USERS {
        ObjectId _id
        string name
        string email
        string passwordHash
        string role
    }
    PATIENTS {
        ObjectId _id
        ObjectId userId
        string name
        int age
        string gender
        string contact
        string address
    }
    DOCTORS {
        ObjectId _id
        ObjectId userId
        string name
        string specialization
        string department
    }
    APPOINTMENTS {
        ObjectId _id
        ObjectId patientId
        ObjectId doctorId
        date date
        string time
        string status
        string reason
    }
    PRESCRIPTIONS {
        ObjectId _id
        ObjectId appointmentId
        ObjectId doctorId
        ObjectId patientId
        array medicines
        string notes
    }
    BILLS {
        ObjectId _id
        ObjectId patientId
        ObjectId appointmentId
        number amount
        string paymentStatus
    }
```

## Relationship Summary

| Relationship | Cardinality |
|---|---|
| Doctor → Appointments | 1 : N |
| Patient → Appointments | 1 : N |
| Appointment → Prescription | 1 : 1 |
| Appointment → Bill | 1 : 1 |
| Doctor → Prescriptions | 1 : N |
| Patient → Bills | 1 : N |
| User → Doctor / Patient | 1 : 1 |