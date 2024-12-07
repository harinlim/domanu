import { z } from 'zod'

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, 'Please enter a username or email'),
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
})

export type SignupSchema = z.infer<typeof signupSchema>
