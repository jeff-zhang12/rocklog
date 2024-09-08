import { Box } from '@chakra-ui/react'
import AccountForm from './account-form'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  return <Box display="flex" justifyContent="center" alignItems="center"><AccountForm user={user} /></Box>
}