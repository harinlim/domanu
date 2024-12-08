'use client'

import { AppShellMain, AppShellNavbar } from '@mantine/core'
import NavBar from '@/app/components/NavBar'

interface ProfileLayoutProps {
  children: React.ReactNode
  title: string
  currentTab: string
  onClick: (tab: string) => void
}

export default function ProfileLayout({ children, title, currentTab, onClick }: ProfileLayoutProps) {
  return (
    <>
      <AppShellNavbar>
        <NavBar currentTab={currentTab} onClick={onClick} />
      </AppShellNavbar>
      <AppShellMain>
        {title && (
          <h1 className="px-5 pt-5 text-4xl font-bold text-[#699B60]">
            {title}
          </h1>
        )}
        <div className="px-5 pt-5">
          {children}
        </div>
      </AppShellMain>
    </>
  )
}