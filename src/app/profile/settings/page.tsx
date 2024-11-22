'use client'

import { AppShell, AppShellMain, Title, Container } from '@mantine/core'
import Header from '../../components/Header'
import NavBar from '../../components/NavBar'

export default function Profile() {
  return (
    <AppShell header={{ height: 120 }} navbar={{ width: 200, breakpoint: 'sm' }} padding="md">
      {Header()}
      {NavBar('/profile/settings')}
      <AppShellMain>
        <Title order={1} style={{ color: '#699B60', paddingLeft: 20, paddingTop: 20 }}>
          Settings
        </Title>
      </AppShellMain>
    </AppShell>
  )
}
