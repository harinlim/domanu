import { Grid } from '@mantine/core'
import MarketplaceCard from '@/app/components/MarketplaceCard'

const bids = [
  {
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Bid: $200 for 10 trips',
    id: 1,
  },
  {
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Bid: $400 for 10 haircuts',
    id: 2,
  },
]

export default function Bids() {
  return (
    <Grid>
      {bids.map((bid) => (
        <MarketplaceCard {...bid} />
      ))}
    </Grid>
  )
}
