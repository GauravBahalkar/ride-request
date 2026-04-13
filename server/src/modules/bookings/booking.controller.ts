import type { Request, Response } from "express";
import * as service from "./booking.service.js";
import * as schema from "./booking.schema.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";

export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const data = schema.createBookingRequestSchema.parse(req.body);
    const result = await service.createBookingRequestService(
      req.user.userId,
      data
    );
    res.status(201).json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const handleRequest = async (req:  AuthRequest, res: Response) => {
  try {
    const { status } = schema.updateRequestSchema.parse(req.body);
    const result = await service.handleBookingRequestService(
      Number(req.params.id),
      req.user.userId,
      status
    );
    res.json({ success: true, data: result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
};

export const getBookings = async (req:  AuthRequest, res: Response) => {
  const data = await service.getUserBookingsService(req.user.userId);
  res.json({ success: true, data });
};

export const getVendorBookings = async (req:  AuthRequest, res: Response) => {
  const data = await service.getVendorBookingsService(req.user.userId);
  res.json({ success: true, data });
};

export const getBookingById = async (req:  AuthRequest, res: Response) => {
  const data = await service.getBookingByIdService(
    Number(req.params.id),
    req.user.userId
  );
  res.json({ success: true, data });
};

export const cancelBooking = async (req:  AuthRequest, res: Response) => {
  const data = await service.cancelBookingService(
    Number(req.params.id),
    req.user.userId
  );
  res.json({ success: true, data });
};

export const getRequests = async (req:  AuthRequest, res: Response) => {
  const data = await service.getUserRequestsService(req.user.userId);
  res.json({ success: true, data });
};

export const getVendorRequests = async (req:  AuthRequest, res: Response) => {
  const data = await service.getVendorRequestsService(req.user.userId);
  res.json({ success: true, data });
};