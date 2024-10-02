import { z } from 'zod';

const createUserValidation = z.object({
 body: z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Invalid email address'),
  // image: z.string().nonempty('Image is required'),
 })
});
  
// const signinValidation = z.object({
//   body: z.object({
//     email: z.string().email('Invalid email address'),
//     password: z.string().max(20, 'Password is required'),
//   }),
// });

export const UserValidation={
  createUserValidation,
  // signinValidation
};