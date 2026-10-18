# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Hospital Operations Desk staff (Administrators and Receptionists) managing high-throughput patient intake, doctor departmental schedules, appointment coordination, and billing checkout.
- **Secondary:** Doctors handling outpatient consultation queues, reviewing patient histories, and issuing digital prescriptions.
- **Tertiary:** Patients accessing self-service appointment views, prescription records, and payment receipts.

## Product Purpose

To digitize and centralize hospital operations across patients, doctors, appointments, prescriptions, and billing through a single integrated web platform. The system eliminates paper logbooks, prevents duplicate patient registrations, resolves appointment conflicts, and provides transparent financial and operational tracking.

## Positioning

A purpose-built, responsive MERN-stack hospital management hub tailored for mid-sized multi-specialty facilities. Unlike fragmented spreadsheets or bloated enterprise legacy suites, it tightly connects front-desk reception, clinical consultation, and billing checkout in a fast, role-governed web application.

## Operating Context

- Front-desk reception counters, administrative offices, and consultation rooms in mid-sized multi-specialty hospital facilities.
- High-velocity administrative environments where staff need immediate patient search, rapid doctor schedule lookup, and instant bill generation under time pressure.
- Modern desktop and tablet web browsers connected across a local hospital network or secure cloud hosting.

## Capabilities and Constraints

- **Core Capabilities:**
  - Role-based access control and JWT authentication across Administrator, Doctor, Receptionist, and Patient roles.
  - Patient management: Quick intake registration, profile editing, search by contact/name, and medical history tracking.
  - Doctor management: Specialization mapping, outpatient department (OPD) availability schedules, and profile management.
  - Appointment lifecycle: Real-time booking, schedule collision prevention, rescheduling, and status tracking (scheduled, completed, cancelled).
  - Prescription management: Digital consultation notes, medicine dosage/frequency details, and historical patient records.
  - Billing & Invoicing: Itemized medical bill creation, status management (Paid, Unpaid, Pending), and operational revenue reporting.
- **Constraints & Out of Scope:**
  - Out of scope for current phase: Native iOS/Android apps, automated AI diagnostic features, live external payment gateway integrations (simulated checkout only), and external laboratory/pharmacy API integrations.
  - Backed by 6 core MongoDB collections (`Users`, `Patients`, `Doctors`, `Appointments`, `Prescriptions`, `Bills`) with Express.js REST APIs and a React 19/Vite frontend.

## Brand Commitments

- **Name:** Hospital Management System (HMS)
- **Voice:** Professional, clear, clinical, and reassuring.
- **Visual Standard:** Clean healthcare aesthetic prioritizing typographic hierarchy, high data scanability, and zero visual clutter that could obscure critical clinical or billing data.

## Evidence on Hand

- Project specification and documentation: `README.md`, `docs/Planning.md`, `docs/design/database-design.md`, `docs/design/erd.md`, `docs/design/navigation-flow.md`, and `docs/design/wireframes.md`.
- Functional client codebase: React 19 with Vite, React Router v7, Axios, and modular layouts under `client/src/`.
- Express.js and Mongoose backend with modular controllers, routes, and schemas under `server/`.
- No third-party customer testimonials or artificial marketing assets exist; future work must not fabricate them.

## Product Principles

1. **Clarity Over Ornament:** Healthcare workflows demand high scanability, instant comprehension, and zero decorative distractions that slow down intake or clinical decisions.
2. **Role-Tailored Information Density:** Receptionists and administrators require efficient, data-dense tables with quick actions; doctors need focused consultation views; patients require simple, reassuring summaries.
3. **Data Integrity & Frictionless Flow:** Transitions between patient registration, appointment booking, prescription writing, and billing checkout must be seamless with no dead ends.
4. **Resilient Status Communication:** Critical operational statuses (appointment states, payment status, doctor availability) must be unmistakable and communicated through text, color, and iconography.

## Accessibility & Inclusion

- WCAG AA contrast compliance to guarantee readability under varying clinic lighting and display hardware.
- Full keyboard accessibility for rapid tabular navigation and high-speed form entry.
- Redundant status cues (color paired with unambiguous icons and text labels) for color-blind accessibility.
