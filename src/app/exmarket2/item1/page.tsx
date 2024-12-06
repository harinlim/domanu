'use client'

import React from 'react'
import { AppShell, AppShellMain, Grid, Title, Space, Image, Text } from '@mantine/core'
import '@mantine/core/styles.css'
import Header from '../../components/Header'

function Item1() {
  return (
    <AppShell header={{ height: 120 }} padding="md">
      {Header()}

      <AppShellMain>
        <Grid style={{ paddingLeft: 72, paddingTop: 20, paddingRight: 72 }}>
          <Grid.Col span={1}>
            <Image
              radius="md"
              src={'/barber.jpg'}
              w="100%"
              style={{
                aspectRatio: '1/1',
                objectFit: 'cover',
              }}
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <Title order={1} style={{ color: '#699B60' }}>
              Barber
            </Title>
            <Space h="sm" />
            <Text fw={700}>Open to bids</Text>
            <Space h="sm" />
            <Text>Haircut service. Cuts for men and women, all hair textures.</Text>
            <Space h="sm" />
            <Text>Seller: barber123</Text>
          </Grid.Col>
        </Grid>
        <Space h="lg" />
        <Text size="xl" style={{ color: '#699B60', paddingLeft: 60 }}>
          Make a Bid
        </Text>
        <Space h="lg" />
        <Title order={1} style={{ color: '#699B60', paddingLeft: 60 }}>
          Current Bids
        </Title>
      </AppShellMain>
    </AppShell>
  )
}

export default Item1
