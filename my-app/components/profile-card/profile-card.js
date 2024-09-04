"use client"

import { createClient } from "@/utils/supabase/client"
import { Card, Heading, Text, Image, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function ProfileCard({ user }) {
    const supabase = createClient()
    const [name, setFullname] = useState("")
    const [bio, setBio] = useState("")
    const [avatarURL, setAvatarUrl] = useState("")


    const getProfile = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('full_name, bio, avatar_url')
                .eq('id', user?.id)
                .single()

            if (error) {
                throw error
            }

            if (data) {
                setFullname(data.full_name)
                setBio(data.bio)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert('Error loading user data!')
        }
    }

    useEffect(() => {
        if (user) {
            getProfile()
        }
        else {
            setFullname("Alex HandHold")
            setBio("This is a test account, play around!")
            setAvatarUrl("https://yt3.googleusercontent.com/kMc1yCReVuFXw39PQcFjn-v-dW9BEVy36AMuRP8Ru2HFfFTCn0E4mZdngOtWDYwdRPCuFKLhUQ=s160-c-k-c0x00ffffff-no-rj")
        }
    }, [user, getProfile])

    return (
        <Card padding='15px'>
            <Flex direction="column" alignItems='center'>
                <Image
                    borderRadius='full'
                    boxSize='75px'
                    src={avatarURL}
                    fallbackSrc='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                />
                <Heading size='md'>{name}</Heading>
                <Text size='lg'>{bio}</Text>
            </Flex>
        </Card>
    )
}