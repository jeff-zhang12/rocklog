'use client'

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    Select,
} from '@chakra-ui/react'
import ClimbCard from '../climb-card/climb-card';
import ClimbForm from '../climb-form/climb-form';
import { createClient } from '@/utils/supabase/client'


export default function SessionForm( {user} ) {
    const supabase = createClient()

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <div>
            <Button onClick={onOpen}>Start Session</Button>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                size='xl'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Session Log</DrawerHeader>

                    <DrawerBody>
                        <ClimbForm user = {user}/>
                        <ClimbCard/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3}>
                            Save Draft
                        </Button>
                        <Button colorScheme='teal' onClick={onClose}>Log Session</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}