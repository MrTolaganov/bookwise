import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(3),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University card is required"),
  })
  .merge(signInSchema);
