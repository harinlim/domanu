import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Please enter a username or email'),
  password: z.string().min(1, 'Please enter a password'),
})

export type LoginSchema = z.infer<typeof loginSchema>

// Note zod validations are done in the OPPOSITE order they are defined
export const signupSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .min(1, 'Please enter a password'),
  first_name: z.string().min(1, 'Please enter a first name'),
  last_name: z.string().min(1, 'Please enter a last name'),
  username: z.string().min(1, 'Please enter a username'),
})

export type SignupSchema = z.infer<typeof signupSchema>
