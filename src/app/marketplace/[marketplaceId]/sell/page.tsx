'use client'

import { TextInput, Button, Alert, Text, Space, Container } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState } from 'react'
import { sell } from './actions'

export default function sellForm({ params }: { params: { marketplaceId: string } }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      description: '',
      price: '',
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = form.onSubmit(async values => {
    setIsSubmitting(true)
    const result = await sell(values, params)

    if (result.success) {
      setError('')
      window.location.replace(`/marketplace/${params.marketplaceId}`)
      return
    }

    setIsSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    setError('Failed to sell service. Please try again later.')
  })

  return (
    <Container className="my-10 max-w-md">
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert
            variant="light"
            color="red"
            title={error}
            withCloseButton
            closeButtonLabel="Dismiss error"
            onClose={() => setError('')}
            icon={<IconAlertCircle />}
            className="bg-color mb-5"
          />
        )}
        <TextInput
          label="Name"
          placeholder="Service name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <Space h="md" />
        <TextInput
          label="Description"
          placeholder="Service description"
          key={form.key('description')}
          {...form.getInputProps('description')}
        />
        <Space h="md" />
        <TextInput
          label="Price"
          placeholder="Price"
          key={form.key('price')}
          {...form.getInputProps('price')}
        />
        <Button type="submit" disabled={isSubmitting} className="mt-5 h-11 w-full bg-blue-600">
          <Text className="text-sm font-medium">Sell Service</Text>
        </Button>
      </form>
    </Container>
  )
}
