import type { Request, Response } from "express";
import { loginService, signupService } from "./auth.service.js";
import { users } from "../../db/schema/users.schema.js";

import { getProfileService } from "./auth.service.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const user = await signupService(userData);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const user = await loginService(userData);

    return res.status(201).json({
      success: true,
      message: "User login  successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    console.log("inside controller");
    const userId = req.user?.userId;
    console.log("userid", userId);

    const user = await getProfileService(userId);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
