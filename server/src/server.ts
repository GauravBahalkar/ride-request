import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("server running");
});

app.use("/api", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
