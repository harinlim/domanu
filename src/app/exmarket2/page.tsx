'use client'

import React from 'react'
import Link from 'next/link'
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Burger,
  Grid,
  Title,
  Space,
  Image,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import '@mantine/core/styles.css'
import Card from '../components/Card'

function ExMarket2() {
  let card = Card({
    title: 'Barber',
    image: 'barber.jpg',
    description: 'Haircut service. Cuts for men and women, all hair textures.',
    button: 'Bid',
    redirect: '/exmarket2/item1',
    numCol: 3,
  })

  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell header={{ height: 120 }} padding="md">
      <AppShellHeader>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title size={56} style={{ color: '#699B60', paddingTop: 20, paddingLeft: 30 }}>
          <Link href="/">Domanu</Link>
        </Title>
      </AppShellHeader>

      <AppShellMain>
        <Grid style={{ paddingLeft: 72, paddingTop: 20, paddingRight: 72 }}>
          <Grid.Col span={5}>
            <Grid>
              <Grid.Col span={3}>
                <Image
                  radius="md"
                  src={'beauty.jpg'}
                  w="100%"
                  style={{
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  }}
                />
              </Grid.Col>
              <Grid.Col span={9}>
                <Title order={1} style={{ color: '#699B60' }}>
                  Personal and Beauty Services
                </Title>
                <Space h="md" />
                <Text size="lg">
                  Marketplace for those seeking specific services related to personal care and
                  beautification services like makeup artists, hairdressers, etc.
                </Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={1}></Grid.Col>
          <Grid.Col span={3}>
            <Text fw={700}>In this Marketplace</Text>
            <Space h="md" />
            <Text>Your Active Sales: 0</Text>
            <Text>Your Active Bids: 2</Text>
            <Text>Your Active Commitments: 1</Text>
          </Grid.Col>
          <Grid.Col span={3}>
            <Text size="xl" style={{ color: '#699B60' }}>
              Sell a Service
            </Text>
          </Grid.Col>
        </Grid>
        <div style={{ textAlign: 'center' }}>
          <Title order={1} style={{ color: '#699B60', paddingTop: 20, paddingLeft: 30 }}>
            Available Items
          </Title>
        </div>
        <Space h="md" />
        <Grid style={{ paddingLeft: 50, paddingTop: 20, paddingRight: 50 }}>
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
          {card}
        </Grid>
      </AppShellMain>
    </AppShell>
  )
}

export default ExMarket2
