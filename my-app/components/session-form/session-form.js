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
    Divider,
} from '@chakra-ui/react'
import ClimbCard from '../climb-card/climb-card';
import ClimbForm from '../climb-form/climb-form';
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import ClimbList from '../climb-list/climb-list';
import ClimbTabs from '../climb-type-tabs/climb-type-tabs';

export default function SessionForm({ user, id, active }) {
    const supabase = createClient()
    const [session_id, setID] = useState(null);
    const [exists, setExists] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

    async function openDrawer() {
        onOpen()
        if (id) {
            setID(id)
        } else {
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

    useEffect(() => {
        if (!isOpen) {
            setID(null);
        }
        if (id) {
            setExists(true)
        }
    }, [isOpen, id]);

    return (
        <div>
            {exists ? (
                <Button onClick={openDrawer} colorScheme="teal" variant="outline">View Session</Button>

            ) : (
                <Button onClick={openDrawer} colorScheme="teal">Start Session</Button>
            )}
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
                        {active && <ClimbTabs user={user} session_id={session_id}/>}
                        <Divider></Divider>
                        <ClimbList session_id={session_id} active={active}/>
                    </DrawerBody>

                    <DrawerFooter>

                        {active ? (
                            <div>
                                <Button variant='outline' mr={3} onClick={onClose}>
                                    Save Draft
                                </Button>
                                <Button colorScheme='teal' onClick={endSession}>Log Session</Button>
                            </div>


                        ) : (
                            <Button onClick={onClose}>Close</Button>
                        )}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
