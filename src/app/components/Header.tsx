'use client'

import React from 'react'
import Link from 'next/link'
import { AppShellHeader, Flex, Avatar, Title } from '@mantine/core'
import '@mantine/core/styles.css'

export default function Header() {
  return (
    <AppShellHeader>
      <Flex
        justify="space-between"
        align="center"
        style={{ paddingTop: '20px', paddingLeft: '30px', paddingRight: '30px' }}
      >
        <Title size={56} style={{ color: '#699B60' }}>
          <Link href="/">Domanu</Link>
        </Title>

        <Link href="/profile">
          <Avatar src="/profile-icon.svg" radius="xl" size="lg" />
        </Link>
      </Flex>
    </AppShellHeader>
  )
}
