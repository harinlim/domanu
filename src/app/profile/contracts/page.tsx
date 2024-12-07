'use client'

import { AppShell, AppShellMain, Title, Stack, Grid, Text, Space } from '@mantine/core'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import Card from '../../components/MarketplaceCard'

export default function Profile() {
  let service1 = Card({
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Frequency: Weekly\nSessions left: 4\nDuration left: 1 month',
    id: 1,
  })
  let service2 = Card({
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Frequency: Every 2 months\nSessions left: 12\nDuration left: 2 years',
    id: 2,
  })

  return (
    <AppShell header={{ height: 120 }} navbar={{ width: 200, breakpoint: 'sm' }} padding="md">
      {Header()}
      {NavBar('/profile/contracts')}
      <AppShellMain>
        <Grid style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}>
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
        <Space h="xl" />
      </AppShellMain>
    </AppShell>
  )
}
