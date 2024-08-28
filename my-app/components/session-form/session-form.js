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
    Divider,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text
} from '@chakra-ui/react'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import ClimbList from '../climb-list/climb-list'
import ClimbTabs from '../climb-type-tabs/climb-type-tabs'

export default function SessionForm({ user, id, active }) {
    const supabase = createClient()
    const [session_id, setID] = useState(null)
    const [exists, setExists] = useState(false)
    const [name, setName] = useState("Bouldering Session")
    const [notes, setNotes] = useState("")
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();


    async function openDrawer() {
        onDrawerOpen()
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
            const { error } = await supabase
                .from('sessions')
                .update({ 
                    name: name,
                    notes: notes,
                    active: false 
                })
                .eq('id', session_id)

            if (error) {
                throw error
            }
            onDrawerClose()
            onModalClose()
        } catch (error) {
            alert('Error Ending Session')
        }
    }

    useEffect(() => {
        if (!isDrawerOpen) {
            setID(null)
        }
        if (id) {
            setExists(true)
        }
    }, [isDrawerOpen, id]);

    return (
        <Box>
            {exists ? (
                <Button onClick={openDrawer} colorScheme="teal" variant="outline">View Session</Button>

            ) : (
                <Button onClick={openDrawer} colorScheme="teal" margin="5px" width="90%">Start Session</Button>
            )}
            <Drawer
                isOpen={isDrawerOpen}
                placement='left'
                onClose={onDrawerClose}
                size='xl'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Session Log</DrawerHeader>

                    <DrawerBody>
                        {active && <ClimbTabs user={user} session_id={session_id} />}
                        <Divider></Divider>
                        <ClimbList session_id={session_id} active={active} />
                    </DrawerBody>

                    <DrawerFooter>

                        {active ? (
                            <div>
                                <Button variant='outline' mr={3} onClick={onDrawerClose}>
                                    Save Draft
                                </Button>
                                <Button colorScheme='teal' onClick={onModalOpen}>Log Session</Button>
                            </div>


                        ) : (
                            <Button onClick={onDrawerClose}>Close</Button>
                        )}

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Modal isOpen={isModalOpen} onClose={onModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box marginTop="5px" marginBottom="5px">
                            <Text>Session Name: </Text>
                            <Input colorScheme='teal' name='name' defaultValue="Bouldering Session" onChange={(e) => setName(e.target.value)} />
                        </Box>
                        <Box marginTop="5px" marginBottom="5px">
                            <Text>Session Notes: </Text>
                            <Input colorScheme='teal' name='notes' onChange={(e) => setNotes(e.target.value)} />
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="outline" onClick={onModalClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='teal' onClick={endSession}>Finish Logging</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
