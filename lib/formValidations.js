import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().min(2).max(50),
  password: z.string().min(2).max(50),
  isOrg: z.boolean().default(false).optional(),
});

export const loginSchema = signupSchema.pick({
  email: true,
  password: true,
});

export const BuildingSchema = z.object({
  registeredAddress: z.string(),
  city: z.string(),
  country: z.string(),
  building_use: z.string(),
});
