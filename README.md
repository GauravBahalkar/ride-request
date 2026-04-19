# RentDrive - Premium Vehicle Rental Platform

A full-stack, production-hardened vehicle rental application built with React 19, Vite, Tailwind CSS, Node.js, Drizzle ORM, and PostgreSQL.

## 🚀 Features
- **Auth**: JWT-based authentication with role-based access control (Customer/Vendor).
- **Security**: Helmet, CORS, and Rate Limiting configured.
- **Uploads**: Cloudinary-integrated file uploads for avatars and vehicle documents.
- **Vehicles**: Comprehensive browsing with filtering, sorting, and pagination.
- **Bookings**: End-to-end booking flow with conflict detection and status management.

## 🛠️ Setup Instructions

### 1. Backend Setup
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=3000
   DATABASE_URL=your_postgres_url
   JWT_SECRET=your_random_secret
   CLOUD_NAME=your_cloudinary_name
   CLOUD_API_KEY=your_cloudinary_key
   CLOUD_API_SECRET=your_cloudinary_secret
   CLIENT_URL=http://localhost:5173
   ```
4. Sync database schema: `npm run db:push`
5. Start the server: `npm run dev`

### 2. Frontend Setup
1. Navigate to the client directory: `cd client`
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the app: `npm run dev`

## 🔒 Security Pass
- All auth routes are rate-limited.
- Passwords hashed with bcrypt.
- JWT expiry set to 7 days.
- Secure HTTP headers enabled via Helmet.
- Input validation enforced via Zod.
