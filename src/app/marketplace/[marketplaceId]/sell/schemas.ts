import { z } from 'zod'

export const sellSchema = z.object({
  name: z.string().trim().min(1, 'Please enter a name'),
  description: z.string().trim().min(1, 'Please enter a description'),
  price: z.string().trim().min(1, 'Please enter a price'),
})

export type sellSchema = z.infer<typeof sellSchema>
