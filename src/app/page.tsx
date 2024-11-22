'use client'

import { AppShell, AppShellMain, Title, Grid, Space } from '@mantine/core'
import Card from './components/Card'
import Header from './components/Header'

export default function Home() {
  let title1 = 'UNC Students Help'
  let img1 = 'unc.jpg'
  let desc1 =
    'Marketplace for current students of UNC Chapel Hill to exchange services with those in their community.'
  let button = 'Go to Marketplace'
  let link1 = '/exmarket1'

  let title2 = 'Personal and Beauty Services'
  let img2 = 'beauty.jpg'
  let desc2 =
    'Marketplace for those seeking specific services related to personal care and beautification services like makeup artists, hairdressers, etc.'
  let link2 = '/exmarket2'

  let item1 = 'Barber'
  let itemi1 = 'barber.jpg'
  let itemd1 = 'Haircut service. Cuts for men and women, all hair textures.'
  let itemb1 = 'Bid on Personal and Beauty Services'
  let iteml1 = '/exmarket2/item1'

  let item2 = 'Ride Share Service'
  let itemi2 = 'drive.jpg'
  let itemd2 =
    'Rides over time to get to any location within 10 miles of Chapel Hill. Car can seat 1-4 passengers excluding driver.'
  let itemb2 = 'Bid on UNC Students Help'
  let iteml2 = '/exmarket1/item1'

  return (
    <AppShell header={{ height: 120 }} padding="md">
      {Header()}

      <AppShellMain>
        <div style={{ textAlign: 'center' }}>
          <Title order={1} style={{ color: '#699B60', paddingTop: 20, paddingLeft: 30 }}>
            Marketplaces
          </Title>
        </div>
        <Space h="md" />
        <Grid style={{ paddingLeft: 50, paddingTop: 20, paddingRight: 50 }}>
          {Card({
            title: title1,
            image: img1,
            description: desc1,
            button: button,
            redirect: link1,
            numCol: 2,
          })}
          {Card({
            title: title2,
            image: img2,
            description: desc2,
            button: button,
            redirect: link2,
            numCol: 2,
          })}
        </Grid>
        <Space h="xl" />
        <div style={{ textAlign: 'center' }}>
          <Title order={1} style={{ color: '#699B60', paddingTop: 20, paddingLeft: 30 }}>
            Available Items
          </Title>
        </div>
        <Space h="md" />
        <Grid style={{ paddingLeft: 50, paddingTop: 20, paddingRight: 50 }}>
          {Card({
            title: item1,
            image: itemi1,
            description: itemd1,
            button: itemb1,
            redirect: iteml1,
            numCol: 3,
          })}
          {Card({
            title: item2,
            image: itemi2,
            description: itemd2,
            button: itemb2,
            redirect: iteml2,
            numCol: 3,
          })}
        </Grid>
      </AppShellMain>
    </AppShell>
  )
}
