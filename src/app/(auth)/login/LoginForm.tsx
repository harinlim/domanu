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

// import { signup } from '../actions'
import { signupSchema } from '../schemas'
import { login } from '../actions'

export function LoginForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      remember: false,
    },
    validate: zodResolver(signupSchema),
    clearInputErrorOnChange: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = form.onSubmit(async values => {
    setIsSubmitting(true)
    const result = await login(values)

    if (result.success) {
      setError('')
      router.push('/')
      return
    }

    setIsSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    setError('Failed to sign up. Please try again later.')
  })

  return (
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
        label="Email"
        placeholder="Your email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        key={form.key('password')}
        {...form.getInputProps('password')}
        className="mt-4"
      />
      <Group className="mt-5 justify-between">
        <Checkbox
          label="Remember me"
          key={form.key('remember')}
          {...form.getInputProps('remember')}
        />
        {/* TODO: implement forgot password */}
        {/* <Anchor component={Link} size="sm">
      Forgot password?
    </Anchor> */}
      </Group>
      <Button type="submit" disabled={isSubmitting} className="mt-5 h-11 w-full bg-blue-600">
        <Text className="text-sm font-medium">Sign in</Text>
      </Button>
    </form>
  )
}
