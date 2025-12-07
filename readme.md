# 🚗 Vehicle Rental Management API

A clean and scalable **backend API** for managing a complete vehicle rental system.  
Built with **Node.js (TypeScript)** and powered by **PostgreSQL**, the system supports secure authentication, vehicle inventory tracking, rental bookings, and cost calculations.

---

## 📘 Project Overview

This API handles all core functionalities required in a vehicle rental business:

### 🚘 Vehicles
- Add, update, delete vehicles  
- Track vehicle availability (`available`, `booked`, `returned`)  
- Store essential details (brand, model, daily rent, etc.)

### 👤 Customers
- Secure customer account management  
- Password hashing  
- Profile updates  
- Admin can manage any user  

### 📅 Bookings
- Create vehicle bookings  
- Validate start & end dates  
- Prevent double-bookings  
- Calculate rental cost  
- Manage booking cancellation and returns  
- Automatically update vehicle availability status  

### 🔐 Authentication
- JWT-based login  
- Password hashing using **bcrypt**  
- Role-based access control (**Admin**, **Customer**)  
- Protected routes with middleware  

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js + TypeScript** | Runtime & type safety |
| **Express.js** | Web framework |
| **PostgreSQL** | Database |
| **bcrypt** | Password hashing |
| **jsonwebtoken (JWT)** | Authentication |
| **pg / pg-pool** | PostgreSQL client |

---

## 📂 Folder Structure

src/
│── config/
│── controllers/
│── middlewares/
│── routes/
│── services/
│── utils/
│── app.ts
└── server.ts



---

## 🚀 Key Features

- 🔒 JWT Authentication with Role-Based Access (RBAC)
- 🚗 Vehicle inventory system
- 📆 Booking system with validation
- 💰 Rental cost calculation
- 👮 Admin & Customer permissions
- 📡 REST API structure
- 🧩 Modular & clean codebase

---

## 📬 API Endpoints Overview

### 🔐 Auth Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login & get JWT |

### 👤 User Endpoints
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/users` | Admin | Get all users |
| PATCH | `/api/v1/users/:id` | Admin/Customer | Update user |

### 🚘 Vehicle Endpoints
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/vehicles` | Admin | Add vehicle |
| GET | `/api/v1/vehicles` | Public | List vehicles |
| PATCH | `/api/v1/vehicles/:id` | Admin | Update vehicle |
| DELETE | `/api/v1/vehicles/:id` | Admin | Delete vehicle |

### 📅 Booking Endpoints
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/bookings` | Customer/Admin | Create booking |
| GET | `/api/v1/bookings` | Admin | All bookings |
| GET | `/api/v1/bookings/my` | Customer | User’s bookings |

