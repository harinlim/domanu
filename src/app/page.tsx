'use client'

import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShellHeader>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <div>Logo</div>
      </AppShellHeader>

      <AppShellNavbar p="md">Navbar</AppShellNavbar>

      <AppShellMain>Main</AppShellMain>
    </AppShell>
  );
}