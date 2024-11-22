'use client'

import { Title } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'

export default function NavBarItem(text: string, link: string, page: string) {
  const [activeLink, setActiveLink] = useState(page)

  const handleLinkClick = (link: string) => {
    setActiveLink(link)
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: activeLink === link ? '#e1f5e1' : 'transparent',
        borderRadius: 4,
        marginBottom: '10px',
      }}
      onClick={() => handleLinkClick(link)}
    >
      <Link href={link}>
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
      </Link>
    </div>
  )
}
