'use client'

import React, { useEffect, useState } from 'react'
import { Grid, Title, Text, Image, Button } from '@mantine/core'
import type { Marketplace, MarketplaceResponse } from '@/types/marketplace'
import type { Service, ServicesResponse } from '@/types/service'
import ServiceCard from '../../components/ServiceCard'
import Link from 'next/link'

export default function MarketplacePage({ params }: { params: { marketplaceId: string } }) {
  const [marketplace, setMarketplace] = useState<Marketplace | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMarketplaceData = async () => {
      try {
        // Fetch marketplace details
        const marketplaceResponse = await fetch(`/api/marketplaces/${params.marketplaceId}`)
        if (!marketplaceResponse.ok) {
          throw new Error('Failed to fetch marketplace')
        }
        const marketplaceData = await marketplaceResponse.json()
        setMarketplace(marketplaceData.data)

        // Fetch services for this marketplace
        const servicesResponse = await fetch(`/api/services/marketplace/${params.marketplaceId}`)
        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services')
        }
        const servicesData = await servicesResponse.json()
        setServices(servicesData.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch marketplace data')
      } finally {
        setLoading(false)
      }
    }

    fetchMarketplaceData()
  }, [params.marketplaceId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !marketplace) {
    return <div>Error: {error || 'Failed to load marketplace'}</div>
  }

  return (
    <>
      <Grid className="px-16 py-8">
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={4}>
              <Image
                radius="lg"
                src="/unc.jpg" // You might want to make this dynamic based on marketplace data
                w="100%"
                className="aspect-square object-cover"
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Title order={1} className="mb-4 text-[#699B60]">
                {marketplace.name}
              </Title>
              <Text size="lg" className="leading-relaxed">
                {marketplace.description}
              </Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={3} offset={1}>
          <Text fw={700} className="mb-4">
            In this Marketplace
          </Text>
          <div className="space-y-2">
            <Text>Bidding Enabled: {marketplace.bidding ? 'Yes' : 'No'}</Text>
            <Text>Bargaining Enabled: {marketplace.bargaining ? 'Yes' : 'No'}</Text>
            <Text>Private Marketplace: {marketplace.private ? 'Yes' : 'No'}</Text>
          </div>
        </Grid.Col>

        <Grid.Col span={2}>
          <Link href={`/marketplace/${params.marketplaceId}/sell`}>
            <Button
              variant="filled"
              radius="xl"
              className="bg-[#699B60] transition-colors duration-200 hover:bg-[#588350]"
            >
              Sell a Service
            </Button>
          </Link>
        </Grid.Col>
      </Grid>

      <div className="mb-8 text-center">
        <Title order={1} className="text-[#699B60]">
          Available Services
        </Title>
      </div>

      <div className="flex flex-wrap gap-6 px-16">
        {services.map(service => (
          <ServiceCard
            key={service.id}
            title={service.name}
            image="/service-default.jpg"
            description={service.description}
            id={parseInt(service.id)}
            marketId={parseInt(params.marketplaceId)}
          />
        ))}
      </div>
    </>
  )
}
