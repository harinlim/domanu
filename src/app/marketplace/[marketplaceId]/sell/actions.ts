import { z } from 'zod'
import { sellSchema } from './schemas'
type SellInput = z.infer<typeof sellSchema>

interface SellResponse {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function sell(
  values: SellInput,
  params: { marketplaceId: string }
): Promise<SellResponse> {
  try {
    const response = await fetch('/api/services/create-service', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        price: values.price,
        active: true,
        marketplace_id: params.marketplaceId,
      }),
      credentials: 'include',
    })

    const data = await response.json()
    console.log(data)

    if (data.message && Object.keys(data.message).length !== 0) {
      return { success: true }
    }

    return {
      success: false,
      error: data.message || 'Failed to sell service',
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
