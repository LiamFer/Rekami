import { z } from 'zod';

export const ZodValidateUser = z.object({
  name: z.string().min(6).max(12),
  email: z.string().email(),
  password: z.string().min(6).max(12),
});

export type UserDTO = z.infer<typeof ZodValidateUser>;