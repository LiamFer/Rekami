import { z } from 'zod';

export type UserDTO = {
  name: string;
  email: string;
  password: string;
};

export const ZodValidateUser = z.object({
  name: z.string().min(6).max(12),
  email: z.string().email(),
  password: z.string().min(6).max(12),
});
