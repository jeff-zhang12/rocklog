import { Button, ButtonGroup, Link, Heading, Stack, Box } from '@chakra-ui/react'

export default function Navigation() {
  return (
    <Stack direction="row" alignContent="center" padding="20px">
      <Box w="50%">
        <Heading>
          <Link href='/'>Panya</Link>
        </Heading>
      </Box>
      <Box w="50%" alignContent="center" justifyContent="center">
        <Button>
          <Link href='/account'>Profile</Link>
        </Button>
        <Button>
          <Link href='/login'>Log In/Sign up</Link>
        </Button>
      </Box>

    </Stack>
  );
}
