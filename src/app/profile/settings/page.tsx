'use client'

import ProfileLayout from "../ProfileLayout"
import { Text } from "@mantine/core"

export default function Settings() {
  return (
    <ProfileLayout title="Settings" currentPath="/profile/settings">
      <Text>Settings</Text>
    </ProfileLayout>
  )
}
