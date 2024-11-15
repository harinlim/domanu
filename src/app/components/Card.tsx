import React from 'react'
import Link from 'next/link'
import { Text, Title, Grid, Paper, Button, Space, Image } from '@mantine/core'
import '@mantine/core/styles.css'

interface CardProps {
  title: string
  image: string
  description: string
  button: string
  redirect: string
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
              <Text>{description}</Text>
              <Space h="sm" />
              <Button>{button}</Button>
            </Grid.Col>
          </Grid>
        </Paper>
      </Grid.Col>
    </>
  )
}
