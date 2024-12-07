'use client'

import { AppShell, AppShellMain, Title, Image, Grid, Text, Space } from '@mantine/core'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Card from '../components/MarketplaceCard'

export default function Profile() {
  let review1 = Card({
    title: 'Great seller!',
    image: '/profile-pic2.jpg',
    description: 'domanu123 gave me some awesome haircuts! Highly recommend!',
    id: 1,
  })
  let review2 = Card({
    title: 'Love her manicures!',
    image: '/profile-pic3.jpg',
    description: 'She was very nice and I got so many compliments on my nails :)',
    id: 2,
  })

  return (
    <AppShell header={{ height: 120 }} navbar={{ width: 200, breakpoint: 'sm' }} padding="md">
      {Header()}
      {NavBar('/profile')}
      <AppShellMain>
        <Grid style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}>
          <Grid.Col span={4}>
            <Grid>
              <Grid.Col span={4}>
                <Image
                  radius="md"
                  src={'/profile-pic.jpg'}
                  w="100%"
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  }}
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <Title order={1} style={{ color: '#699B60' }}>
                  domanu123
                </Title>
                <Space h="sm" />
                <Text size="lg">Hi! I'm a dummy user for Domanu.</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={1}></Grid.Col>
          <Grid.Col span={3}>
            <Text fw={700}>Stats</Text>
            <Space h="md" />
            <Text>Active Sales: 2</Text>
            <Text>Active Bids: 3</Text>
            <Text>Active Contracts: 3</Text>
            <Text>Completed Contracts: 5</Text>
            <Text>User since: November 22, 2024</Text>
          </Grid.Col>
        </Grid>
        <Space h="xl" />
        <Title order={1} style={{ color: '#699B60', paddingLeft: 20 }}>
          Reviews
        </Title>
        <Grid>
          {review1}
          {review2}
        </Grid>
      </AppShellMain>
    </AppShell>
  )
}
