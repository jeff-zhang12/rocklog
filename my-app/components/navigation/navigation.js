import { Button, Link, Heading, Flex, Image } from '@chakra-ui/react'
import { createClient } from '@/utils/supabase/server';

export default async function Navigation() {

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Flex backgroundColor="#0b2b26" direction="row" alignContent="center" padding="20px" marginBottom="20px">
      <Flex w="75%">
        <Link href='/' color="white">
          <Image src='/logo.png' width="150px" />
        </Link>

      </Flex>
      <Flex w="25%" alignContent="center" justifyContent="flex-end">
        <Button marginTop="10px" marginRight="5px">
          <Link href='/account'>Profile</Link>
        </Button>

        {user ? (
          <form action="/auth/signout" method="post">
            <Button marginTop="10px" marginLeft="5px" type="submit">
              Sign Out
            </Button>
          </form>


        ) : (
          <Button marginTop="10px" marginLeft="5px">
            <Link href='/login'>Log In/Sign up</Link>
          </Button>
        )}
      </Flex>

    </Flex>
  );
}
