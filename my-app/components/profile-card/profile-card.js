"use client"

import { createClient } from "@/utils/supabase/client"
import { Card, Heading, Text, Image } from "@chakra-ui/react"
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
        console.log(user)
        if (user) {
            getProfile()
        }
        else {
            setFullname("Alex HandHold")
            setBio("This is a test account, play around!")
            setAvatarUrl("")
        }
    }, [user, getProfile])

    return (
        <Card>
            <Image
                borderRadius='full'
                boxSize='100px'
                src={avatarURL}
                fallbackSrc='/public/blank-avatar.png'
            />
            <Heading>{name}</Heading>
            <Text>{bio}</Text>
        </Card>
    )
}