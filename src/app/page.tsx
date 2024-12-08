'use client'

import { useSession } from '@/hooks/useSession'
import { Image, Title, Button } from '@mantine/core'
import Link from 'next/link'
import Home from './Home'

export default function Page() {
  const { session } = useSession()

  if (!session) {
    return (
      <>
        <div className="flex h-[700px] w-full flex-col items-center justify-center">
          <Image src="unc.jpg" h={400} w={600} />
          <Title order={1} className="py-5 text-center text-[#699B60]">
            Join Domanu today to start buying and selling services!
          </Title>
          <Button component={Link} href="/login">
            Join now!
          </Button>
        </div>
      </>
    )
  }

  return <Home />
}
