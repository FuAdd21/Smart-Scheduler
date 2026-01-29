# Smart Scheduler – Appointment Booking System

Smart Scheduler is a backend appointment management system for small businesses.  
It allows business owners to create available time slots and clients to book them securely.

---

## Features

- User Registration & Login (JWT Authentication)
- Role-Based Access (Owner / Client)
- Owner Dashboard
- Create Available Schedules
- View Available Time Slots
- Book Appointments
- Double-Booking Prevention
- MongoDB Database Integration

---

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- REST API
- Postman for Testing

---

## API Endpoints

| Method | Endpoint | Description |
|-------|---------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/schedules | View available schedules |
| POST | /api/schedules | Owner creates schedule |
| PUT | /api/schedules/:id/book | Client books schedule |
| GET | /api/auth/owner-dashboard | Owner only dashboard |

---

## Installation & Setup

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
