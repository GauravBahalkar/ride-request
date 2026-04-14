import { db } from "../../index.js";
import { users } from "../../db/schema/users.schema.js";
import { vehicles } from "../../db/schema/vehicle.schema.js";

import { eq, and, ilike, gte, lte } from "drizzle-orm";

// Get Profile
export const getProfileService = async (userId: number) => {
  console.log("userid", userId);
  const [user] = await db.select().from(users).where(eq(users.id, userId));

  if (!user) throw new Error("User not found");

  return user;
};

//  Update Profile
export const updateProfileService = async (userId: number, data: any) => {
  const [updatedUser] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning();

  return updatedUser;
};

//  Get Vehicles (User side with filters)
export const getUserVehiclesService = async (filters: any) => {
  const conditions = [
    eq(vehicles.isAvailable, true),
    eq(vehicles.status, "active"),
  ];

  if (filters.location) {
    conditions.push(ilike(vehicles.location, `%${filters.location}%`));
  }

  if (filters.vehicleType) {
    conditions.push(eq(vehicles.vehicleType, filters.vehicleType));
  }

  if (filters.minPrice) {
    conditions.push(gte(vehicles.pricePerDay, Number(filters.minPrice)));
  }

  if (filters.maxPrice) {
    conditions.push(lte(vehicles.pricePerDay, Number(filters.maxPrice)));
  }

  if (filters.capacity) {
    conditions.push(gte(vehicles.vehicleCapacity, Number(filters.capacity)));
  }

  return await db
    .select()
    .from(vehicles)
    .where(and(...conditions));
};
