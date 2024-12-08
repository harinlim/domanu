'use client'

import { useSession } from '@/hooks/useSession';
import Bids from './components/Biddings';
import Contracts from './components/Contracts';
import Listings from './components/Listings';
import ProfilePage from './components/ProfilePage';
import Settings from './components/Settings';
import ProfileLayout from './ProfileLayout'
import { useState } from 'react'
import { useRouter } from 'next/dist/client/components/navigation';
import { useUser } from '@/hooks/useUser';
import { Profile } from '@/types/user';

const tabs: Record<string, { title: string; tab: string }> = {
  profile: {
    title: 'Profile',
    tab: 'profile',
  },
  listings: {
    title: 'Listings',
    tab: 'listings',
  },
  bids: {
    title: 'Bids',
    tab: 'bids',
  },
  contracts: {
    title: 'Contracts',
    tab: 'contracts',
  },
  settings: {
    title: 'Settings',
    tab: 'settings',
  },
}

export default function Page() {
  const [currentTab, setCurrentTab] = useState('profile')
  const { session, loading, error } = useSession();
  const { user, loading: userLoading, error: userError } = useUser();
  const router = useRouter();
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error} </div>
  if (userError) return <div>Error: {userError}</div>
  if (userLoading) return <div>Loading...</div>
  
  if (!session || !user) {
    router.push('/login')
  }

  console.log("user", user)

  const onClick = (tab: string) => {
    setCurrentTab(tab)
  }

  return (
    <ProfileLayout title={tabs[currentTab].title} currentTab={tabs[currentTab].tab} onClick={onClick}>
      { currentTab === 'profile' && <ProfilePage user={user as Profile}/> }
      { currentTab === 'listings' && <Listings /> }
      { currentTab === 'bids' && <Bids /> }
      { currentTab === 'contracts' && <Contracts /> }
      { currentTab === 'settings' && <Settings /> } 
    </ProfileLayout>
  )
}
