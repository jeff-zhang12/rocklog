import { Button, ButtonGroup, Link, Heading } from '@chakra-ui/react'

export default function Navigation() {
    return (
      <div>
        <Heading>
          <Link href = '/'>Panya</Link>
        </Heading>
        <Button>
          <Link href = '/account'>Profile</Link>
        </Button>
        <Button>
          <Link href = '/login'>Log In/Sign up</Link>
        </Button>
      </div>  
    );
  }
  