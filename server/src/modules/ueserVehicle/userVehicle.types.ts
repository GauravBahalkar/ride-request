import { z } from "zod";
import { updateProfileSchema } from "./userVehicle.schema.js";

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
