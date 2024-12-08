'use client'

import React from 'react'
import { useEffect, useState } from 'react'
import { AppShell, AppShellMain, Grid, Title, Space, Image, Text } from '@mantine/core'
import '@mantine/core/styles.css'
import { Service } from '@/types/service'

function Item1({ params }: { params: { itemId: string; marketplaceId: string } }) {
  const [service, setService] = useState<Service>()
  const [seller, setSeller] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/service/${params.itemId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const data = await response.json()
        setService(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch service')
      } finally {
        setLoading(false)
      }
    }

    fetchService()

    const fetchSeller = async () => {
      try {
        const response = await fetch(`/api/profiles/username/${service?.seller}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        })

        const data = await response.json()
        if (data.data && data.data.length > 0) {
          setSeller(data.data[0].username)
        } else {
          setSeller('')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch seller')
      } finally {
        setLoading(false)
      }
    }

    fetchSeller()
  }, [params.itemId, service?.seller])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!service) {
    return <div>No service available</div>
  }

  return (
    <>
      <Grid style={{ paddingLeft: 72, paddingTop: 20, paddingRight: 72 }}>
        <Grid.Col span={1}>
          <Image
            radius="md"
            src={'/service-default.jpg'}
            w="100%"
            style={{
              aspectRatio: '1/1',
              objectFit: 'cover',
            }}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Title order={1} style={{ color: '#699B60' }}>
            {service.name}
          </Title>
          <Space h="sm" />
          <Text fw={700}>Open to bids</Text>
          <Space h="sm" />
          <Text>{service.description}</Text>
          <Space h="sm" />
          <Text>Seller: {seller}</Text>
        </Grid.Col>
      </Grid>
      <Space h="lg" />
      <Text size="xl" style={{ color: '#699B60', paddingLeft: 60 }}>
        Make a Bid
      </Text>
      <Space h="lg" />
      <Title order={1} style={{ color: '#699B60', paddingLeft: 60 }}>
        Current Bids
      </Title>
    </>
  )
}

export default Item1
