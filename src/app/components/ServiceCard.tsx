'use client'

import React from 'react'
import Link from 'next/link'
import { Text, Title, Card, Button, Image } from '@mantine/core'
import '@mantine/core/styles.css'

interface CardProps {
  title: string
  image: string
  description: string
  id: number
  marketId: number
}

export default function ServiceCard({ title, image, description, id, marketId }: CardProps) {
  return (
    <div className={`basis-[calc(${100 / 3}%-1rem)] max-w-[380px]`}>
      <Card
        shadow="sm"
        padding="lg"
        radius="lg"
        className="h-[200px] transition-shadow duration-200 hover:shadow-md"
      >
        <div className="flex h-full gap-4">
          <div className="h-full w-[150px] flex-none">
            <Image
              radius="lg"
              src={image}
              w="100%"
              h="100%"
              style={{
                aspectRatio: '1/1',
                objectFit: 'cover',
                maxHeight: 'calc(200px - 2rem)',
                minWidth: '150px',
              }}
              alt={title}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <Title order={4} className="mb-2 text-[#699B60]">
              {title}
            </Title>

            <Text className="mb-4 line-clamp-2 whitespace-pre-line text-gray-600 md:line-clamp-3">
              {description}
            </Text>
            <div className="flex-1"></div>

            <div className="flex justify-end">
              <Link href={`/marketplace/${marketId}/${id}`}>
                <Button
                  variant="filled"
                  radius="xl"
                  className="bg-[#699B60] transition-colors duration-200 hover:bg-[#588350]"
                >
                  Bid
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
