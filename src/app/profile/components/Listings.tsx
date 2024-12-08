import MarketplaceCard from "@/app/components/MarketplaceCard"
import { Grid } from "@mantine/core"

const listings = [
  {
    title: 'Ride Share Service',
    image: '/drive.jpg',
    description: 'Bids: 13',
    id: 1,
  },
  {
    title: 'Barber',
    image: '/barber.jpg',
    description: 'Bids: 8',
    id: 2,
  },
]

export default function Listings() {
  return (
    <Grid>
      {listings.map((listing) => (
        <MarketplaceCard {...listing} />
      ))}
    </Grid>
  )
}
