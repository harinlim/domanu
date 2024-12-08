'use client'

import { AppShell, AppShellMain } from "@mantine/core";
import Header from "./components/Header";
import { usePathname } from "next/navigation";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isProfile = pathname === '/profile'
  console.log(isProfile)
  
  return (
    <AppShell header={{ height: 120 }} navbar={isProfile ? {
      width: 200,
      breakpoint: 'sm',
    } : undefined } padding="md">
      <Header />
      {isProfile ? (
        children
      ) : (
        <AppShellMain>
          {children}
        </AppShellMain>
      )}
    </AppShell>
  )
}