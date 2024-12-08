'use client'

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Group,
  Button,
  Alert,
  Anchor,
  Box,
  Text,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { signupSchema } from '../schemas'
import { signup } from '../actions'

export function SignupForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      terms: false,
    },
    validate: zodResolver(signupSchema),
    clearInputErrorOnChange: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = form.onSubmit(async values => {
    setIsSubmitting(true)
    const result = await signup(values)

    if (result.success) {
      setError('')
      router.push('/')
      return
    }

    setIsSubmitting(false)

    if (result.error) {
      const errorMessage = typeof result.error === 'object' 
        ? result.error?.message || 'An unexpected error occurred'
        : result.error
      setError(errorMessage)
      return
    }

    setError('Failed to sign up. Please try again later.')
  })

  const [isDisabled, setIsDisabled] = useState(!form.getValues().terms)
  form.watch('terms', field => setIsDisabled(!field.value))

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert
          variant="light"
          color="red"
          mb="lg"
          title={error}
          withCloseButton
          closeButtonLabel="Dismiss error"
          onClose={() => setError('')}
          icon={<IconAlertCircle />}
        />
      )}
      <TextInput
        label="Email"
        withAsterisk
        placeholder="Email@example.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Username"
        withAsterisk
        placeholder="Username"
        mt="md"
        key={form.key('username')}
        {...form.getInputProps('username')}
      />
      <TextInput
        label="First Name"
        withAsterisk
        placeholder="First Name"
        mt="md"
        key={form.key('first_name')}
        {...form.getInputProps('first_name')}
      />    
      <TextInput
        label="Last Name"
        withAsterisk
        placeholder="Last Name"
        mt="md"
        key={form.key('last_name')}
        {...form.getInputProps('last_name')}
      />
      <PasswordInput
        label="Password"
        withAsterisk
        placeholder="Your password"
        mt="md"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />
      <Group justify="space-between" mt="lg">
        <Checkbox
          label="I accept terms and conditions"
          key={form.key('terms')}
          required
          {...form.getInputProps('terms')}
        />
      </Group>
      <Button
        type="submit"
        fullWidth
        mt="lg"
        mb="sm"
        size="md"
        // Completely disable button on submit, but allow focus otherwise
        disabled={isSubmitting}
        aria-disabled={isDisabled}
        data-disabled={isDisabled}
      >
        <Text size="sm" fw={500}>
          Sign up
        </Text>
      </Button>

      <Box ta="right" pr="sm">
        <Anchor
          component={Link}
          href="/login"
          size="xs"
          className="text-blue-600 underline dark:text-blue-400"
        >
          Already have an account? Login
        </Anchor>
      </Box>
    </form>
  )
}
