# Application Workflow — Hospital Management System

Example: booking an appointment.

```mermaid
flowchart TD
    A[Login] --> B[Dashboard]
    B --> C["Select 'Book Appointment'"]
    C --> D[Choose Doctor & Time Slot]
    D --> E[Submit Appointment Request]
    E --> F[(Database Updated<br/>Appointments Collection)]
    F --> G[Confirmation Message Displayed]
```

## Step-by-Step

1. **Login** — user authenticates with email/password (JWT issued).
2. **Dashboard** — user lands on their role-specific dashboard.
3. **Select "Book Appointment"** — patient navigates to the appointment booking page.
4. **Choose Doctor & Time Slot** — patient picks an available doctor and slot.
5. **Submit Appointment Request** — form data is sent to the backend via a `POST /api/appointments` request.
6. **Database Updated** — a new document is created in the `Appointments` collection with status `pending`.
7. **Confirmation Message Displayed** — the frontend shows a success message and the new appointment appears in "My Appointments."