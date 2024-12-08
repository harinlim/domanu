'use client'

import { Grid, Stack, Space, Title } from '@mantine/core'
import ProfileLayout from '../ProfileLayout'
import MarketplaceCard from '@/app/components/MarketplaceCard'

export default function Contracts() {
  let service1 = MarketplaceCard({
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Frequency: Weekly\nSessions left: 4\nDuration left: 1 month',
    id: 1,
  })
  let service2 = MarketplaceCard({
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Frequency: Every 2 months\nSessions left: 12\nDuration left: 2 years',
    id: 2,
  })

  return (
    <ProfileLayout title="" currentPath="/profile/contracts">
      <Grid>
        <Grid.Col span={5}>
          <Title order={1} style={{ color: '#699B60' }}>
            Buys
          </Title>
          <Space h="md" />
          <Stack>
            {service1}
            {service2}
          </Stack>
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
        <Grid.Col span={5}>
          <Title order={1} style={{ color: '#699B60' }}>
            Sells
          </Title>
          <Space h="md" />
          <Stack>
            {service1}
            {service2}
          </Stack>
        </Grid.Col>
      </Grid>
    </ProfileLayout>
  )
}
