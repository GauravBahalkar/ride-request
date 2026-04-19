import { db } from "../../index.js";
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import { users } from "../../db/schema/users.schema.js";
import { vehicles } from "../../db/schema/vehicle.schema.js";

import { eq, and, ilike, gte, lte, or, asc, desc } from "drizzle-orm";

// Get Profile
export const getProfileService = async (userId: number) => {
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

// ==========================
// PROFILE PHOTO UPLOAD
// ==========================
export const uploadProfilePhotoService = async (
  userId: number,
  file: Express.Multer.File,
) => {
  const result = await uploadToCloudinary(file, "profile-photos");

  const [updatedUser] = await db
    .update(users)
    .set({ profilePhoto: result.secure_url })
    .where(eq(users.id, userId))
    .returning();

  return { ...updatedUser, url: result.secure_url };
};


//  Get Vehicles (User side with filters)
export const getUserVehiclesService = async (filters: any) => {
  const { search, vehicleType, minPrice, maxPrice, capacity, sort, page = 1, limit = 12 } = filters;

  const conditions = [
    eq(vehicles.isAvailable, true),
    eq(vehicles.status, "active"),
  ];

  if (search) {
    conditions.push(
      or(
        ilike(vehicles.vehicleName, `%${search}%`),
        ilike(vehicles.location, `%${search}%`)
      ) as any
    );
  }

  if (vehicleType && vehicleType !== "all") {
    conditions.push(eq(vehicles.vehicleType, vehicleType));
  }

  if (minPrice) {
    conditions.push(gte(vehicles.pricePerDay, Number(minPrice)));
  }

  if (maxPrice) {
    conditions.push(lte(vehicles.pricePerDay, Number(maxPrice)));
  }

  if (capacity) {
    conditions.push(gte(vehicles.vehicleCapacity, Number(capacity)));
  }

  const offset = (Number(page) - 1) * Number(limit);

  const query = db
    .select()
    .from(vehicles)
    .where(and(...conditions))
    .limit(Number(limit))
    .offset(offset);

  if (sort === "price_asc") {
    query.orderBy(asc(vehicles.pricePerDay));
  } else if (sort === "price_desc") {
    query.orderBy(desc(vehicles.pricePerDay));
  } else {
    query.orderBy(desc(vehicles.createdAt));
  }

  return await query;
};
