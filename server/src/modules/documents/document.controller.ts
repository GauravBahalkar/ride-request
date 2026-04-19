import type { Request, Response } from "express";
import { uploadUserDocumentService, uploadVehicleDocumentService } from "./document.service.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const uploadUserDocument = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId;
    const { documentType } = req.body;

    if (!req.file) return res.status(400).json({ success: false, message: "File required" });
    if (!documentType) return res.status(400).json({ success: false, message: "documentType required" });

    const doc = await uploadUserDocumentService(userId, documentType, req.file);
    return res.status(201).json({ success: true, data: doc });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const uploadVehicleDocument = async (req: Request, res: Response) => {
  try {
    const { vehicleId, documentType } = req.body;
    if (!req.file) return res.status(400).json({ success: false, message: "File required" });

    const doc = await uploadVehicleDocumentService(Number(vehicleId), documentType, req.file);
    return res.status(200).json({ success: true, data: doc });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};
