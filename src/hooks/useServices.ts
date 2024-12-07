import { useState, useEffect } from 'react'
import type { Service } from '@/types/service'
import type { Marketplace } from '@/types/marketplace'

const MOCK_SERVICES: Record<string, Service[]> = {
  "1": [
    {
      id: "101",
      name: 'Tutoring Service',
      description: 'Math and Science tutoring for all levels',
      marketplace: "1",
      seller: 'user1',
      price: 25.00,
      active: true
    },
    {
      id: "102",
      name: 'Photography',
      description: 'Professional photography for events',
      marketplace: "1",
      seller: 'user2',
      price: 100.00,
      active: true
    }
  ],
  "2": [
    {
      id: "201",
      name: 'Web Development',
      description: 'Custom website development',
      marketplace: "2",
      seller: 'user3',
      price: 500.00,
      active: true
    }
  ]
}

export function useServices(marketplaces: Marketplace[]) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesPromises = marketplaces.map(marketplace =>
          fetch(`/api/services/marketplace/${marketplace.id}`).then(res => res.json())
        )

        const servicesResults = await Promise.all(servicesPromises)
        const allServices = servicesResults.flatMap(result => 
          result.status === 'success' ? result.data : []
        )
        
        setServices(allServices)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services')
      } finally {
        setLoading(false)
      }
    }
    
    if (marketplaces.length > 0) {
      fetchServices()
    }
  }, [marketplaces])

  return { services, loading, error }
} 