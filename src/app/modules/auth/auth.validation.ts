// validations/auth.validation.ts
import { z } from 'zod';

const signinValidation = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().max(20, 'Password is required'),
  }),
});

export const authSignInValidations = {
  signinValidation,
};