import type { Request, Response } from "express";
import * as userService from "./userVehicle.service.js";

import type { AuthRequest } from "../../middleware/auth.middleware.js";
import { userInfo } from "node:os";

// Profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = await userService.getProfileService(req.user.userId);
  res.json({ success: true, data: user });
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const data = req.body;
  const user = await userService.updateProfileService(req.user.userId, data);

  res.json({ success: true, data: user });
};

// Vehicles
export const getVehicles = async (req: Request, res: Response) => {
  const vehicles = await userService.getUserVehiclesService(req.query);
  res.json({ success: true, data: vehicles });
};
