import { z } from 'zod';

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

export const OrganisationFormSchema = z.object({
  organisationName: z.string().min(2),
  organisationNumber: z.string().min(2),
  organisationAddress: z.string().min(5),
  alterateNumber: z.string().min(2),
  city: z.string().min(2),
  country: z.string().min(2),
  pincode: z.string().min(2),
});
