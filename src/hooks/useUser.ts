import { useState, useEffect } from 'react'
import { Profile } from '@/types/user'

export function useUser<Profile>() {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('http://localhost:8000/profiles/get_user_profile', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        console.log("response", response)
        
        const data = await response.json();

        if (data.message === "User could not be found") {
          setUser(null)
        } else { 
          setUser(data.message)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [])

  return { user, loading, error }
} 
