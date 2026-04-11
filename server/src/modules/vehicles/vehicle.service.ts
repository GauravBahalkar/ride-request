import { db } from "../../index.js";
import { vehicles } from "../../db/schema/vehicle.schema.js";
import { eq , and} from "drizzle-orm";


export const createVehicleService = async (
  data: any,
  vendorId: number
) => {
  const vehicle = await db
    .insert(vehicles)
    .values({
      vehicleName: data.vehicleName,
      vehicleType: data.vehicleType,
      vehicleCapacity: data.vehicleCapacity,
      pricePerDay: data.pricePerDay,
      location: data.location,
      imageUrl: data.imageUrl,
      isAvailable: data.isAvailable ?? true,
      status: data.status ?? "active",
      features: data.features
        ? JSON.stringify(data.features): null,
      vendorId,
    })
    .returning();

  return vehicle[0];
};







export const updateVehicleService = async (
  vehicleId: number,
  data: any,
  vendorId: number
) => {
  // ✅ 1. Check vehicle exists
  const [existingVehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));

  if (!existingVehicle) {
    throw new Error("Vehicle not found");
  }

  // ✅ 2. Ownership check
  if (existingVehicle.vendorId !== vendorId) {
    throw new Error("Unauthorized to update this vehicle");
  }

  // ✅ 3. Prepare update data
  const updateData: any = {
    ...data,
    updatedAt: new Date(),
  };

  // Handle features JSON
  if (data.features) {
    updateData.features = JSON.stringify(data.features);
  }

  // ✅ 4. Update DB
  const [updatedVehicle] = await db
    .update(vehicles)
    .set(updateData)
    .where(eq(vehicles.id, vehicleId))
    .returning();

  return updatedVehicle;
};



///////// get alll vehicles for vendor only

export const getVendorVehiclesService = async (vendorId: number) => {
  try {
    const result = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.vendorId, vendorId));

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch vendor vehicles");
  }
};

// ///// get vehicles by id

export const getVendorVehicleByIdService = async (
  vehicleId: number,
  vendorId: number,
) => {
  try {
    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(and(eq(vehicles.id, vehicleId), eq(vehicles.vendorId, vendorId)));

    if (!vehicle) {
      throw new Error("Vehicle not found or unauthorized");
    }

    return vehicle;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch vehicle");
  }
};

// /////  delete vehicle vendor secure

export const deleteVehicleService = async (
  vehicleId: number,
  vendorId: number,
) => {
  try {
    // Check ownership
    const [existingVehicle] = await db
      .select()
      .from(vehicles)
      .where(and(eq(vehicles.id, vehicleId), eq(vehicles.vendorId, vendorId)));

    if (!existingVehicle) {
      throw new Error("Vehicle not found or unauthorized");
    }

    //  Delete
    await db.delete(vehicles).where(eq(vehicles.id, vehicleId));

    return { message: "Vehicle deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message || "Delete failed");
  }
};
