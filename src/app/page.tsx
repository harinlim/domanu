// 'use client'

import { Title } from '@mantine/core'
import MarketplaceCard from './components/MarketplaceCard'
import ServiceCard from './components/ServiceCard'
import { useMarketplaces } from '@/hooks/useMarketplaces'
import { useServices } from '@/hooks/useServices'
import { MOCK_MARKETPLACES, MOCK_SERVICES } from './mocks/mock-data'

export default function Home() {
  // const { marketplaces, loading: marketplacesLoading, error: marketplacesError } = useMarketplaces()
  // const { services, loading: servicesLoading, error: servicesError } = useServices(marketplaces)

  // if (marketplacesLoading || servicesLoading) {
  //   return <div>Loading...</div>
  // }

  // if (marketplacesError || servicesError) {
  //   return <div>Error: {marketplacesError || servicesError}</div>
  // }

  const marketplaces = MOCK_MARKETPLACES
  const services = MOCK_SERVICES

  return (
    <>
      <div className="text-center">
        <Title order={1} className="text-[#699B60] py-5">
          Marketplaces
        </Title>
      </div>
      <div className="flex flex-wrap gap-4 px-12 py-5">
        {marketplaces.map((marketplace, index) => (
          <div key={marketplace.id} className="flex-1 basis-[calc(50%-1rem)]">
            <MarketplaceCard
              title={marketplace.name}
              image={"unc.jpg"}
              description={marketplace.description}
              id={parseInt(marketplace.id)}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <Title order={1} className="text-[#699B60] py-5">
          Available Services
        </Title>
      </div>

      <div className="flex flex-wrap gap-4 px-12 py-5">
        {services.map((service) => (
          <div key={service.id}>
            <ServiceCard
              title={service.name}
              image="unc.jpg"
              description={service.description}
              id={parseInt(service.id)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
