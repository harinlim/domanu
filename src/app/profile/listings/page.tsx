'use client'

import { Grid } from '@mantine/core'
import ProfileLayout from '../ProfileLayout'
import MarketplaceCard from '@/app/components/MarketplaceCard'

export default function Listings() {
  let sell1 = MarketplaceCard({
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Bids: 13',
    id: 1,
  })
  let sell2 = MarketplaceCard({
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Bids: 8',
    id: 2,
  })

  return (
    <ProfileLayout title="Your Listings" currentPath="/profile/listings">
      <Grid>
        {sell2}
        {sell1}
      </Grid>
    </ProfileLayout>
  )
}
