import { Button, Link, Heading, Flex } from '@chakra-ui/react'

export default function Navigation() {
  return (
    <Flex direction="row" alignContent="center" padding="20px">
      <Flex w="75%">
        <Heading>
          <Link href='/'>Panya</Link>
        </Heading>
      </Flex>
      <Flex w="25%" alignContent="center" justifyContent="flex-end">
        <Button margin="5px">
          <Link href='/account'>Profile</Link>
        </Button>
        <Button margin="5px">
          <Link href='/login'>Log In/Sign up</Link>
        </Button>
      </Flex>

    </Flex>
  );
}
