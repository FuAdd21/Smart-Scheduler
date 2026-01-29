# Smart Scheduler – Backend

## Overview
Smart Scheduler is a backend API that allows users to create, book, manage, and cancel appointment schedules.  
It supports **role-based access** for Owners and Clients and includes a basic notification system.

---

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- CORS
- dotenv

---

## Features

### Authentication
- Register User
- Login User
- JWT Token Generation
- Password Hashing

### Roles
- Client
- Owner
- Owner-only route protection

### Schedule Management (Owner)
- Create Schedule
- Update Schedule
- Delete Schedule
- View Booked Schedules

### Booking (Client)
- Book Schedule
- Cancel Booking

### Notifications
- Basic notification logic for booking and cancellation actions

---

## API Endpoints (Examples)

### Auth
POST /api/auth/register
POST /api/auth/login

### Owner
GET /api/auth/owner-dashboard
POST /api/schedules/create
PUT /api/schedules/:id/cancel
DELETE /api/schedules/:id/delate
GET /api/schedules/owner/booked

### Client
POST /api/bookings/:scheduleId/create
DELETE /api/bookings/:bookingId/delate

---

## Environment Variables
Create a `.env` file in the root folder:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

---

## Run Locally
npm install
npm run dev
