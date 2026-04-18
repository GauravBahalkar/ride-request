import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import vehicleRoutes from "./modules/vehicles/vehicle.routes.js";
import userVehicleRoutes from "./modules/ueserVehicle/userVehicle.routes.js";
import bookingRoutes from "./modules/bookings/booking.routes.js";
const app = express();

app.use(express.json());
// ✅ CORS CONFIG
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
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

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
