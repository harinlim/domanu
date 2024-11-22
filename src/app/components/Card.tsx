'use client'

import React from 'react'
import Link from 'next/link'
import { Text, Title, Grid, Paper, Button, Space, Image } from '@mantine/core'
import '@mantine/core/styles.css'

interface CardProps {
  title: string
  image: string
  description: string
  button: string | null
  redirect: string | null
  numCol: number
}

export default function Card({ title, image, description, button, redirect, numCol }: CardProps) {
  return (
    <>
      <Grid.Col span={12 / numCol}>
        <Paper shadow="xs" p="xl">
          <Grid>
            <Grid.Col span={3}>
              <Image
                radius="md"
                src={image}
                w="100%"
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'cover',
                }}
              />
            </Grid.Col>
            <Grid.Col span={9}>
              <Title order={4}>{title}</Title>
              <Space h="sm" />
              <Text style={{ whiteSpace: 'pre-line' }}>{description}</Text>
              <Space h="sm" />
              {button != null ? (
                <Link href={redirect}>
                  <Button>{button}</Button>
                </Link>
              ) : null}
            </Grid.Col>
          </Grid>
        </Paper>
      </Grid.Col>
    </>
  )
}
