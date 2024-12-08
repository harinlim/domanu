'use client'

import { Grid, Stack, Space, Title } from '@mantine/core'
import ProfileLayout from '../ProfileLayout'
import MarketplaceCard from '@/app/components/MarketplaceCard'

const services = [
  {
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Frequency: Weekly\nSessions left: 4\nDuration left: 1 month',
    id: 1,
  },
  {
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Frequency: Every 2 months\nSessions left: 12\nDuration left: 2 years',
    id: 2,
  },
]

export default function Contracts() {

  return (
    <Grid>
      <Grid.Col span={5}>
        <Title order={1} style={{ color: '#699B60' }}>
          Buys
        </Title>
        <Space h="md" />
        <Stack>
          {services.map((service) => (
            <MarketplaceCard {...service} />
          ))}
        </Stack>
      </Grid.Col>
      <Grid.Col span={1}></Grid.Col>
      <Grid.Col span={5}>
        <Title order={1} style={{ color: '#699B60' }}>
          Sells
        </Title>
        <Space h="md" />
        <Stack>
          {services.map((service) => (
            <MarketplaceCard {...service} />
          ))}
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
