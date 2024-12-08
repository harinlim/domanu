'use client'

import Bids from './components/Biddings';
import Contracts from './components/Contracts';
import Listings from './components/Listings';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ProfileLayout from './ProfileLayout'
import { useState } from 'react'

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

  const onClick = (tab: string) => {
    setCurrentTab(tab)
  }

  return (
    <ProfileLayout title={tabs[currentTab].title} currentTab={tabs[currentTab].tab} onClick={onClick}>
      { currentTab === 'profile' && <Profile /> }
      { currentTab === 'listings' && <Listings /> }
      { currentTab === 'bids' && <Bids /> }
      { currentTab === 'contracts' && <Contracts /> }
      { currentTab === 'settings' && <Settings /> } 
    </ProfileLayout>
  )
}
