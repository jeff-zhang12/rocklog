'use client'

import { Box, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import ClimbCard from "../climb-card/climb-card"

export default function ClimbList({ session_id , active }) {
    const supabase = createClient();
    const [climbs, setClimbs] = useState([])

    useEffect(() => {
        const fetchClimbs = async () => {
            if (session_id) {
                const { data, error } = await supabase
                    .from('climbs')
                    .select('*')
                    .eq('session', session_id)

                if (error) {
                    console.error('Error fetching climbs:', error)
                } else {
                    setClimbs(data)
                }
            }
        };

        fetchClimbs()

        const subscription = supabase
            .channel('climbs')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'climbs' }, (payload) => {
                fetchClimbs()
            })
            .subscribe()

        return () => {
            supabase.removeChannel(subscription)
        };
    }, [session_id]);

    return (
        <Box>
            <Heading>Climbs</Heading>
            {climbs.map((climb) => (
                <ClimbCard key={climb.id} climb={climb} active={active}/>
            ))}
        </Box>
    );
}