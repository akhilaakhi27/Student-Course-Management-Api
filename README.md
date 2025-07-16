
# Student Course Management System – Clean REST API

This is a backend-only RESTful API built using **Node.js**, **Express.js**, and **MongoDB**, designed to manage student registrations, course assignments, and progress tracking with secure authentication. The project follows clean code architecture and uses Postman for API testing.

---

##  Features

-  Admin & Student registration/login using JWT
-  Add/Edit/Delete student profiles (Admin only)
-  Create/Edit/Delete courses (Admin only)
-  Assign courses to students
-  Track course progress for each student
-  Role-based access control
-  API documentation using Postman

## Tech Stack

| Tech | Description |
|------|-------------|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| JWT | Token-based authentication |
| Postman | API testing & documentation |


## Project Structure

student-course-api/
│
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # Express API routes
├── middlewares/ # Auth & role protection
├── config/ # MongoDB connection
├── .env # Environment variables
├── app.js # Main app config
├── server.js # Server entry file
├── README.md
└── API_DOCUMENTATION.md


## Authentication

- JWT-based authentication
- Role-based authorization
- Token required for all protected routes via:Authorization: Bearer <token>

## API Endpoints

### Authentication
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Admin only |
| POST | `/api/auth/login` | Admin & Student |

### Student Management (Admin only)
| Method | Endpoint |
|--------|----------|
| POST | `/api/students` |
| GET | `/api/students` |
| GET | `/api/students/:id` |
| PUT | `/api/students/:id` |
| DELETE | `/api/students/:id` |

### Course Management (Admin only)
| Method | Endpoint |
|--------|----------|
| POST | `/api/courses` |
| GET | `/api/courses` |
| GET | `/api/courses/:id` |
| PUT | `/api/courses/:id` |
| DELETE | `/api/courses/:id` |

### Assign Courses (Admin only)
| Method | Endpoint |
|--------|----------|
| POST | `/api/courses/:courseId/assign/:studentId` |

### Progress Tracking
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/progress/:studentId/:courseId` | Admin only |
| GET | `/api/progress/:studentId` | Admin & that student |

---

## Postman API Documentation

- All APIs are documented in Postman
- Includes headers, request bodies, and sample responses
- To test:
1. Open Postman
2. Import `student-course-api.postman_collection.json`
3. Run APIs with proper tokens


## Setup Instructions
1. Clone repo
2. Run `npm install`
3. Create a `.env` in the root

PORT=5000
MONGO_URI=mongodb://localhost:27017/studentCourseDB
JWT_SECRET=your_jwt_secret

4. Run with `nodemon server.js`

## Sample Request:Register

POST /api/auth/register
{
  "name": "Akhila",
  "email": "akhila@example.com",
  "password": "123456",
  "role": "admin"
}

## Access Control Summary

|Role|	|Permissions|
|Admin|	|Full control (CRUD + Assign + Progress)|
|Student|  |Login and view own progress|


