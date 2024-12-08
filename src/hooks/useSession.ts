import { useState, useEffect } from 'react'

export function useSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('http://localhost:8000/auth/session', {
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch session');
        }
        
        const data = await response.json();

        if (data.message === "User could not be signed in" || data.message === "Session data cannot be retrieved") {
          setSession(null)
        } else { 
          setSession(data.message)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
        setSession(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSession()
  }, [])

  return { session, loading, error }
} 