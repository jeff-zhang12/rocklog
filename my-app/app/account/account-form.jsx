'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, Input, Text, Button, Box } from '@chakra-ui/react'

export default function AccountForm({ user }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState(null)
  const [username, setUsername] = useState(null)
  const [bio, setBio] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select('full_name, username, bio, avatar_url')
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setBio(data.bio)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    if (user) {
      getProfile()
    }
  }, [user, getProfile])

  async function updateProfile({ username, bio, avatar_url }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id,
        full_name: fullname,
        username,
        bio,
        avatar_url,
        updated_at: new Date().toISOString(),
      }, {
        returning: 'minimal',
      })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="form-widget" padding="5px" width="80%">
      <Box margin="5px">
        <Text htmlFor="email">Email: </Text>
        <Input id="email" type="text" value={user?.email} disabled />
      </Box>
      <Box margin="5px">
        <Text htmlFor="fullName">Full Name: </Text>
        <Input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
        />
      </Box>
      <Box margin="5px">
        <Text htmlFor="username">Username: </Text>
        <Input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Box>
      <Box margin="5px">
        <Text htmlFor="bio">Bio: </Text>
        <Input
          id="bio"
          type="text"
          value={bio || ''}
          onChange={(e) => setBio(e.target.value)}
        />
      </Box>

      <Box margin="5px">
        <Text htmlFor="bio">Avatar URL: </Text>
        <Input
          id="avatar"
          type="text"
          value={avatar_url || ''}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
      </Box >

      <Box margin="5px">
        <Button
          colorScheme="teal"
          onClick={() => updateProfile({ username, bio, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </Box>
    </Card>
  )
}
