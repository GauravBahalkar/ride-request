import type { Request, Response } from "express";
import {
  createVehicleService,
  updateVehicleService,
} from "./vehicle.service.js";
import { createVehicleSchema } from "./vehicle.schema.js";
import type { AuthRequest } from "../../middleware/auth.middleware.js";
import { eq, and } from "drizzle-orm";
import { db } from "../../index.js";
import { vehicles } from "../../db/schema/vehicle.schema.js";
import {
  getVendorVehiclesService,
  getVendorVehicleByIdService,
  deleteVehicleService,
} from "./vehicle.service.js";

///////create vehicle  add vehicle.

export const createVehicle = async (req: AuthRequest, res: Response) => {
  try {
    // Validate request body
    const data = req.body;

    // Get vendor from auth middleware
    const vendorId = req.user?.userId;

    // Call service
    const vehicle = await createVehicleService(data, vendorId);

    return res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      data: vehicle,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/////////////  update vehicle
export const updateVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const vehicleId = Number(req.params.id);

    // Validate request body
    const data = req.body;

    const vendorId = req.user.userId;

    const updatedVehicle = await updateVehicleService(
      vehicleId,
      data,
      vendorId,
    );

    return res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: updatedVehicle,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//  GET ALL (Vendor)
export const getVendorVehicles = async (req: AuthRequest, res: Response) => {
  try {
    const vendorId = req.user?.userId;

    const vehicles = await getVendorVehiclesService(vendorId);

    return res.status(200).json({
      success: true,
      message: "Your vehicles fetched successfully",
      data: vehicles,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//  GET BY ID (Vendor)
export const getVendorVehicleById = async (req: AuthRequest, res: Response) => {
  try {
    const vendorId = req.user?.userId;
    const vehicleId = Number(req.params.id);

    const vehicle = await getVendorVehicleByIdService(vehicleId, vendorId);

    return res.status(200).json({
      success: true,
      message: "Vehicle fetched successfully",
      data: vehicle,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

//  DELETE (Vendor)
export const deleteVehicle = async (req: AuthRequest, res: Response) => {
  try {
    const vendorId = req.user?.userId;
    const vehicleId = Number(req.params.id);

    const result = await deleteVehicleService(vehicleId, vendorId);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};
