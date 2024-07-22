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
import { useState, useEffect } from 'react'

export default function SessionForm({ user }) {
    const supabase = createClient()
    const [session_id, setID] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function createSession() {
        onOpen()
        try {
            const { data, error } = await supabase
                .from('sessions')
                .insert([{
                    creator: user?.id,
                }])
                .select('id')
            console.log(data[0]?.id)
            setID(data[0]?.id)
            if (error) throw error
        } catch (error) {
            alert('Error Creating Session')
        }
    }

    async function endSession() {
        try {
            console.log(session_id)
            const { error } = await supabase
                .from('sessions')
                .update({ active: false })
                .eq('id', session_id);

            if (error) {
                throw error;
            }
            onClose();
        } catch (error) {
            alert('Error Ending Session');
        }
    }

    return (
        <div>
            <Button onClick={createSession}>Start Session</Button>
            
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
                        <ClimbForm user={user} session_id={session_id} />
                        
                        <ClimbCard/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Save Draft
                        </Button>
                        <Button colorScheme='teal' onClick={endSession}>Log Session</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
