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
}

export default function ServiceCard({ title, image, description, id }: CardProps) {
  return (
      <div className={`basis-[calc(${100/3}%-1rem)] max-w-[400px]`}>
        <Card 
          shadow="sm" 
          padding="lg" 
          radius="lg" 
          className="h-[200px] hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex gap-4 h-full">
            <div className="flex-none w-[150px] h-full">
              <Image
                radius="lg"
                src={image}
                w="100%"
                h="100%"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                  maxHeight: 'calc(200px - 2rem)',
                  minWidth: '150px'
                }}
                alt={title}
              />
            </div>
            <div className="flex-1 flex flex-col">
              <Title 
                order={4}
                className="mb-2 text-[#699B60]"
              >
                {title}
              </Title>

              <Text 
                className="whitespace-pre-line mb-4 line-clamp-2 md:line-clamp-3 text-gray-600"
              >
                {description}
              </Text>
              <div className="flex-1"></div>

              
              <div className="flex justify-end">
                <Link href={`/marketplace/${id}`}>
                  <Button 
                    variant="filled"
                    radius="xl"
                    className="bg-[#699B60] hover:bg-[#588350] transition-colors duration-200"
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
