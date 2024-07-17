import { Button, ButtonGroup, Link } from '@chakra-ui/react'

export default function Navigation() {
    return (
      <div>
        <Button>
          <Link href = '/'>Home</Link>
        </Button>
        <Button>
          <Link href = '/account'>Profile</Link>
        </Button>
        <Button>
          <Link href = '/login'>Log In/Sign up</Link>
        </Button>
      </div>  
    );
  }
  