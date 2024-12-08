'use client'

import { Grid } from '@mantine/core'
import ProfileLayout from '../ProfileLayout'
import MarketplaceCard from '@/app/components/MarketplaceCard'

export default function Bids() {
  let bid1 = MarketplaceCard({
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Bid: $200 for 10 trips',
    id: 1,
  })
  let bid2 = MarketplaceCard({
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Bid: $400 for 10 haircuts',
    id: 2,
  })

  return (
    <ProfileLayout title="Your Bids" currentPath="/profile/bids">
      <Grid>
        {bid1}
        {bid2}
      </Grid>
    </ProfileLayout>
  )
}
