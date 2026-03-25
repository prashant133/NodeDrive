# 📁 NodeDrive – File Storage Backend

A scalable backend system for file storage, sharing, and analytics built with Node.js, MongoDB, Redis, and Cloudinary.

---

## 🚀 Features

### 🔐 Authentication

- JWT-based login & registration
- Secure password hashing

### 📂 File Management

- Upload multiple files (Cloudinary)
- Delete files
- Get user files
- Download files (via redirect)

### 🔗 Sharing System

- Generate public share links
- Access files without login
- Expiry & active status control
- Track download count

### ⚡ Redis Integration

- Login rate limiting (prevent brute force)
- Upload rate limiting
- Caching for file retrieval
- Cache invalidation on write operations

### 📊 Analytics (MongoDB Aggregation)

- File statistics (`/file/stats`)
- Storage usage over time
- Share link analytics

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Cache & Rate Limiting:** Redis
- **Cloud Storage:** Cloudinary
- **Authentication:** JWT

---

## 📁 Folder Structure

src/
├─ config/
├─ middlewares/
├─ modules/
│ ├─ auth/
│ ├─ user/
│ ├─ file/
│ └─ share/
├─ utils/
│ ├─ db.js
│ └─ redis.js
├─ app.js
└─ index.js

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone <repo-url>
cd NodeDrive

```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a .env file

PORT=8080

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

REDIS_URL=redis://localhost:6379

### 4. Run the server

```bash
npm run dev
```

## 📡 API Endpoints

### 🔐 Auth

POST /auth/register
POST /auth/login

### 📂 Files

POST /file/upload
GET /file/get
DELETE /file/:fileId
GET /file/download/:fileId

### 🔗 Share

POST /share/:fileId
GET /share/:token

### 📊 Analytics

GET /analytic/stats
GET /analytic/download/:fileId

## ⚡ Redis Usage

### Rate limiting:

Login attempts per IP
Upload requests per user

### Caching:

getMyFiles endpoint
Cache invalidation on upload & delete

## 🧠 Key Concepts Implemented

- REST API design
- JWT authentication
- Cloud file handling (Cloudinary)
- Redis caching & rate limiting
- Cache invalidation strategy
- MongoDB aggregation pipelines
- Public link sharing system

## 📌 Author
Prashant Deshar