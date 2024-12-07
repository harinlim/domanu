'use client'

import { AppShell, AppShellMain, Title, Grid } from '@mantine/core'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'
import Card from '../../components/MarketplaceCard'

export default function Sells() {
  let sell1 = Card({
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Bids: 13',
    id: 1,
  })
  let sell2 = Card({
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Bids: 8',
    id: 2,
  })

  return (
    <AppShell header={{ height: 120 }} navbar={{ width: 200, breakpoint: 'sm' }} padding="md">
      {Header()}
      {NavBar('/profile/listings')}
      <AppShellMain>
        <Title order={1} style={{ color: '#699B60', paddingLeft: 20, paddingTop: 20 }}>
          Your Listings
        </Title>
        <Grid style={{ paddingLeft: 20, paddingTop: 20, paddingRight: 20 }}>
          {sell2}
          {sell1}
        </Grid>
      </AppShellMain>
    </AppShell>
  )
}
