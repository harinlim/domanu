import { z } from 'zod'
import { loginSchema, signupSchema } from './schemas'

type LoginInput = z.infer<typeof loginSchema>
type SignupInput = z.infer<typeof signupSchema>

interface AuthResponse {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function login(values: LoginInput): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      credentials: 'include',
    })

    const data = await response.json()

    if (data.message === 'User signed in') {
      return { success: true }
    }

    return {
      success: false,
      error: data.message || 'Failed to sign in',
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

export async function signup(values: SignupInput): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      credentials: 'include',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create account')
    }

    console.log("create-user response:", data)

    if (data.message.user) {
      // After successful signup, automatically log the user in
      const loginResponse = await login({
        email: values.email,
        password: values.password,
      })

      console.log(data.message.user.id)

      const update = await fetch('/api/profiles/update-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid: data.message.user.id,
          first: values.first_name,
          last: values.last_name,
          username: values.username,
        }),
        credentials: 'include',
      })

      const updateData = await update.json()

      if (loginResponse.success && updateData.message !== "User creation failed") {
        return { success: true }
      }

      return {
        success: false,
        error: 'Account created but failed to sign in automatically',
      }
    }

    return {
      success: false,
      error: data.message || 'Failed to create account',
    }
  } catch (error) {
    console.error('Signup error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    }
  }
}

export async function signOut(): Promise<AuthResponse> {
  const response = await fetch('/api/auth/sign-out', {
    credentials: 'include',
  })

  return { success: true }
}