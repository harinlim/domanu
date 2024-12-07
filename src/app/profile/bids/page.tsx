'use client'

import { AppShell, AppShellMain, Title, Grid } from '@mantine/core'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import Card from '../../components/MarketplaceCard'

export default function Bids() {
  let bid1 = Card({
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Bid: $200 for 10 trips',
    id: 1,
  })
  let bid2 = Card({
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Bid: $400 for 10 haircuts',
    id: 2,
  })

  return (
    <AppShell header={{ height: 120 }} navbar={{ width: 200, breakpoint: 'sm' }} padding="md">
      {Header()}
      {NavBar('/profile/bids')}
      <AppShellMain>
        <Title order={1} style={{ color: '#699B60', paddingLeft: 20, paddingTop: 20 }}>
          Your Bids
        </Title>
        <Grid style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}>
          {bid1}
          {bid2}
        </Grid>
      </AppShellMain>
    </AppShell>
  )
}
