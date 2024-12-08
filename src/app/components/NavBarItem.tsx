'use client'

import { Button, Title } from '@mantine/core'
import { useState } from 'react'

type NavBarItemProps = {
  text: string
  onClick: (path: string) => void
  currentTab: string
  pageTab: string
}

export default function NavBarItem({ text, onClick, currentTab, pageTab }: NavBarItemProps) {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: pageTab === currentTab ? '#e1f5e1' : 'transparent',
        borderRadius: 4,
        marginBottom: '10px',
      }}
      onClick={() => onClick(pageTab)}
    >
        <Title
          order={3}
          style={{
            color: '#699B60',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            cursor: 'pointer',
            display: 'block',
            textAlign: 'center',
          }}
        >
          {text}
        </Title>
    </div>
  )
}
