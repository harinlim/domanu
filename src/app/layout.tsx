import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AppShell, AppShellMain, MantineProvider } from '@mantine/core'
import { theme } from './theme'
import '@mantine/core/styles.css'
import Header from './components/Header'
import LayoutShell from './LayoutShell'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Domanu',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider defaultColorScheme="light" theme={theme}>
          <main className="min-h-full">
            <LayoutShell>
              {children}
            </LayoutShell>
          </main>
        </MantineProvider>
      </body>
    </html>
  )
}
