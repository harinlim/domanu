import { AppShell, AppShellMain } from '@mantine/core'
import NavBar from '@/app/components/NavBar'

interface ProfileLayoutProps {
  children: React.ReactNode
  title: string
  currentPath: string
}

export default function ProfileLayout({ children, title, currentPath }: ProfileLayoutProps) {
  return (
    <AppShell header={{ height: 120 }} navbar={{ width: 200,  breakpoint: 'sm' }}>
      {NavBar(currentPath)}
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
    </AppShell>
  )
}