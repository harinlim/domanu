import MarketplaceCard from "@/app/components/MarketplaceCard";
import { Grid, Title, Space, Text } from "@mantine/core";
import Image from "next/image";

const reviews = [
  {
    title: 'Great seller!',
    image: '/profile-pic2.jpg',
    description: 'domanu123 gave me some awesome haircuts! Highly recommend!',
    id: 1,
  },
  {
    title: 'Love her manicures!',
    image: '/profile-pic3.jpg',
    description: 'She was very nice and I got so many compliments on my nails :)',
    id: 2,
  },
]

export default function Profile() {
  return (
    <>
      <Grid>
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={4}>
              <Image
                src={'/profile-pic.jpg'}
                className="aspect-square object-cover"
                alt="profile picture"
                width={100}
                height={100}
              />
            </Grid.Col>
            <Grid.Col span={8}>
              <Title order={1} className="text-[#699B60]">
                domanu123
              </Title>
              <Space h="sm" />
              <Text size="lg">Hi! I'm a dummy user for Domanu.</Text>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={1} />
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
      <Title order={1} className="text-[#699B60]">
        Reviews
      </Title>
      <Grid>
        {reviews.map(review => (
          <MarketplaceCard key={review.id} {...review} />
        ))}
      </Grid>
    </>
  )
}