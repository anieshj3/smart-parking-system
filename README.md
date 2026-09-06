# Smart Parking Reservation System

A full-stack MERN application for managing parking slot reservations with real-time availability tracking, user authentication, and admin dashboard.

## 🎯 Features

### User Features
- **User Authentication** - Secure registration and login with JWT tokens and bcrypt password hashing
- **View Available Slots** - Real-time parking slot availability (13 total slots: Cars, Bikes, Trucks)
- **Book Parking Slots** - Reserve available slots with double-booking prevention
- **Manage Reservations** - View, cancel, and track personal reservations
- **Dashboard** - Real-time statistics: Total slots, Available slots, Occupied slots, Total reservations

### Admin Features
- **Manage Parking Slots** - Create, update, delete parking slots
- **View All Reservations** - Monitor all user bookings across the system
- **Admin Dashboard** - System-wide statistics and metrics
- **Safety Checks** - Prevents deleting occupied slots, role-based access control

## 🛠 Tech Stack

**Backend:**
- Node.js & Express.js (REST API)
- MongoDB & Mongoose (Database with relationships)
- JWT (Authentication)
- bcryptjs (Password hashing)
- CORS (Cross-origin requests)

**Frontend:**
- React.js (UI framework)
- Axios (HTTP client with JWT interceptor)
- React Router (Navigation)
- Bootstrap (Styling)

## 📁 Project Structure