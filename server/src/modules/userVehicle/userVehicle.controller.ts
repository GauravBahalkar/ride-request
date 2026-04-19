import type { Request, Response } from "express";
import * as userService from "./userVehicle.service.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.getProfileService(req.user.userId);
    return res.status(200).json({ success: true, data: user });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const user = await userService.updateProfileService(req.user.userId, data);
    return res.status(200).json({ success: true, data: user });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const uploadProfilePhoto = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    if (!req.file) throw new Error("File required");

    const user = await userService.uploadProfilePhotoService(userId, req.file);
    return res.status(200).json({ success: true, data: user });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const getVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await userService.getUserVehiclesService(req.query);
    return res.status(200).json({ success: true, data: vehicles });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};
