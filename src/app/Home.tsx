'use client'

import { useEffect, useState } from 'react'
import { Title } from '@mantine/core'
import MarketplaceCard from './components/MarketplaceCard'
import ServiceCard from './components/ServiceCard'
import { Marketplace } from '@/types/marketplace'
import { Service } from '@/types/service'

export default function Home() {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchMarketplaces = async () => {
      try {
        const response = await fetch('/api/marketplaces/get-all-marketplaces', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const data = await response.json()
        setMarketplaces(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch marketplaces')
      } finally {
        setLoading(false)
      }
    }

    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services/all-services', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const data = await response.json()
        setServices(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services')
      } finally {
        setLoading(false)
      }
    }

    fetchMarketplaces()
    fetchServices()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <>
      <div className="text-center">
        <Title order={1} className="py-5 text-[#699B60]">
          Marketplaces
        </Title>
      </div>
      <div className="flex flex-wrap gap-4 px-12 py-5">
        {marketplaces.map(marketplace => (
          <div key={marketplace.id} className="flex-1 basis-[calc(50%-1rem)]">
            <MarketplaceCard
              title={marketplace.name}
              image={'unc.jpg'}
              description={marketplace.description}
              id={parseInt(marketplace.id)}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Title order={1} className="py-5 text-[#699B60]">
          Available Services
        </Title>
      </div>

      <div className="flex flex-wrap gap-4 px-12 py-5">
        {services.map(service => (
          <div key={service.id}>
            <ServiceCard
              title={service.name}
              image="service-default.jpg"
              description={service.description}
              id={parseInt(service.id)}
              marketId={parseInt(service.marketplace)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
