'use client'

import React from 'react'
import Link from 'next/link'
import { AppShellHeader, Flex, Avatar, Title, Button } from '@mantine/core'
import '@mantine/core/styles.css'
import { signOut } from '../(auth)/actions'
import { useSession } from '@/hooks/useSession'

interface SessionUser {
  id: string;
  email?: string;
  user_metadata?: {
    avatar_url?: string;
  };
}

interface SessionData {
  user: SessionUser;
  access_token: string;
  refresh_token: string;
}

interface HeaderProps {
  session: SessionData | null;
}

export default function Header() {
  const { session, loading, error } = useSession();
  console.log("session", session)
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

        <div className="flex items-center gap-4">
        <Button component={Link} href="/help" variant="outline" color="green">
            FAQs
          </Button>
          { session ? (
            <Button onClick={async () => { 
              await signOut(); 
              // Reset page to reload layout
              window.location.reload() 
            }}>
              Sign out
            </Button>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
            <Link href={session ? "/profile" : "/login"}>
              <Avatar 
              src={"/profile-icon.svg"} 
              radius="xl" 
              size="lg" 
            />
          </Link>
        </div>
      </Flex>
    </AppShellHeader>
  )
}
