import { Button, Card, Flex, Input, Text } from '@chakra-ui/react'
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <Flex height="100vh" justifyContent="center">
      <Card width="80%" height="30%" padding="15px" margin="15px">
        <form>
          <Text htmlFor="email">Email:</Text>
          <Input id="email" name="email" type="email" required />
          <Text htmlFor="password">Password:</Text>
          <Input id="password" name="password" type="password" required />
          <Flex marginTop="20px" justifyContent="center">
            <Button margin="5px">
              <button formAction={login}><b>Log In</b></button>
            </Button>
            <Button margin="5px">
              <button formAction={signup}><b>Sign up</b></button>
            </Button>

          </Flex>
        </form>
      </Card>
    </Flex>

  )
}