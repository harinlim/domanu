'use client'

import { Container } from '@mantine/core'
import NavBarItem from '../components/NavBarItem'

type NavBarProps = {
  currentTab: string
  onClick: (path: string) => void
}

export default function NavBar({ currentTab, onClick }: NavBarProps) {
  return (
    <Container p="md">
      <NavBarItem text="Profile" onClick={onClick} currentTab={currentTab} pageTab="profile" />
      <NavBarItem text="Contracts" onClick={onClick} currentTab={currentTab} pageTab="contracts" />
      <NavBarItem text="Bids" onClick={onClick} currentTab={currentTab} pageTab="bids" />
      <NavBarItem text="Listings" onClick={onClick} currentTab={currentTab} pageTab="listings" />
      <NavBarItem text="Settings" onClick={onClick} currentTab={currentTab} pageTab="settings" />
    </Container>
  )
}
