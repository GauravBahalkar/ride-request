import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";

export const requireRole = (role: "customer" | "vendor") => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied. ${role} role required.`,
      });
    }

    next();
  };
};
