import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "CLOUD_NAME", "CLOUD_API_KEY", "CLOUD_API_SECRET"];
requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    if (key === "JWT_SECRET" || key === "DATABASE_URL") {
      throw new Error(`❌ FATAL: Missing critical environment variable: ${key}`);
    }
    console.warn(`⚠️  WARNING: Missing environment variable: ${key}`);
  }
});

import authRoutes from "./modules/auth/auth.routes.js";
import vehicleRoutes from "./modules/vehicles/vehicle.routes.js";
import userVehicleRoutes from "./modules/userVehicle/userVehicle.routes.js";
import bookingRoutes from "./modules/bookings/booking.routes.js";

import documentRoutes from "./modules/documents/document.routes.js";

const app = express();

// Security headers
app.use(helmet());

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use(limiter);

app.use(express.json());
// ✅ CORS CONFIG
const corsOptions = {
  // origin: process.env.CLIENT_URL || "http://localhost:5173",
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("server running");
});

app.use("/api", authRoutes);
app.use("/api", vehicleRoutes);
app.use("/api/user", userVehicleRoutes);
app.use("/api/user/bookings", bookingRoutes);

app.use(express.urlencoded({ extended: true }));
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
