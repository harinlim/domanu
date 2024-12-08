'use client'

import { AppShell, AppShellMain, AppShellNavbar } from '@mantine/core'
import NavBar from '@/app/components/NavBar'
import { useSession } from '@/hooks/useSession'
import { useRouter } from 'next/navigation'

interface ProfileLayoutProps {
  children: React.ReactNode
  title: string
  currentTab: string
  onClick: (tab: string) => void
}

export default function ProfileLayout({ children, title, currentTab, onClick }: ProfileLayoutProps) {
  const { session, loading, error } = useSession();
  const router = useRouter();
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!session) {
    router.push('/login')
  }

  return (
    <>
      <AppShellNavbar>
        <NavBar currentTab={currentTab} onClick={onClick} />
      </AppShellNavbar>
      <AppShellMain>
        {title && (
          <h1 className="px-5 pt-5 text-2xl font-bold text-[#699B60]">
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