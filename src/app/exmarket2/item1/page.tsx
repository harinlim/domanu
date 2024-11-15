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

function Item1() {
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
          <Grid.Col span={1}>
            <Image
              radius="md"
              src={'../barber.jpg'}
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
