'use client'

import { AppShell, Container } from '@mantine/core'
import NavBarItem from '../components/NavBarItem'

export default function NavBar(page: string) {
  return (
    <AppShell.Navbar p="md">
      <Container>
        {NavBarItem('Profile', '/profile', page)}
        {NavBarItem('Contracts', '/profile/contracts', page)}
        {NavBarItem('Bids', '/profile/bids', page)}
        {NavBarItem('Listings', '/profile/listings', page)}
        {NavBarItem('Settings', '/profile/settings', page)}
      </Container>
    </AppShell.Navbar>
  )
}
