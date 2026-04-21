import { z } from "zod";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Use at least 8 characters."),
  callbackUrl: z.string().optional(),
});
