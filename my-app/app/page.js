import styles from "./page.module.css";
import SessionForm from "@/components/session-form/session-form";
import { createClient } from '@/utils/supabase/server'
import SessionList from "@/components/session-list/session-list";
import { Box, Flex } from "@chakra-ui/react";

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Flex direction="row">
      <Box width="25%">
        Profile
      </Box>
      <Box width="50%">
        <SessionForm user={user} active={true}/>
        <SessionList user={user}/>
      </Box>
      <Box width="25%">
        Stats
      </Box>
    </Flex>
    
  );
}
