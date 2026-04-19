import type { Request, Response } from "express";
import * as service from "./booking.service.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    const result = await service.createBookingRequestService(req.user.userId, data);
    return res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const handleRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    const result = await service.handleBookingRequestService(Number(req.params.id), req.user.userId, status);
    return res.status(200).json({ success: true, data: result });
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const getBookings = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.getUserBookingsService(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const getVendorBookings = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.getVendorBookingsService(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const getBookingById = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.getBookingByIdService(Number(req.params.id), req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.cancelBookingService(Number(req.params.id), req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const getRequests = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.getUserRequestsService(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};

export const getVendorRequests = async (req: AuthRequest, res: Response) => {
  try {
    const data = await service.getVendorRequestsService(req.user.userId);
    return res.status(200).json({ success: true, data });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message || "Internal server error" });
  }
};
