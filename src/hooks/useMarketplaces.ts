import { useState, useEffect } from 'react'
import type { Marketplace, MarketplaceResponse } from '@/types/marketplace'

const MOCK_MARKETPLACES: Marketplace[] = [
  {
    id: "1",
    name: 'UNC Chapel Hill',
    description: 'The official marketplace for UNC Chapel Hill students',
    designer: 'admin',
    bidding: true,
    bargaining: true,
    private: false
  },
  {
    id: "2",
    name: 'Duke University',
    description: 'Buy and sell items within the Duke community',
    designer: 'admin',
    bidding: true,
    bargaining: true,
    private: false
  }
]

export function useMarketplaces() {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketplaces = async () => {
      try {
        const response = await fetch('/api/marketplaces/get-marketplaces')
        if (!response.ok) {
          throw new Error('Failed to fetch marketplaces')
        }
        const data: MarketplaceResponse = await response.json()
        
        if (data.status === 'success') {
          setMarketplaces(Array.isArray(data.data) ? data.data : [data.data])
        } else {
          throw new Error(data.message || 'Failed to fetch marketplaces')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }
    fetchMarketplaces()
  }, [])

  return { marketplaces, loading, error }
} 