'use client'
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Box, Spinner } from "@chakra-ui/react";
import SessionCard from "../session-card/session-card";

export default function SessionList( {user} ){
    const supabase = createClient();
    const [sessions, setSessions] = useState([])
    

    useEffect(() => {
        const fetchSessions = async () => {
            if (user) {
                const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('creator', user.id);
                if(error) {
                    console.error('Error fetching sessions:', error)
                }
                else{
                    setSessions(data.sort((a, b) => {
                        const dateA = new Date(a.created_at)
                        const dateB = new Date(b.created_at)

                        if (dateA < dateB) return -1
                        if (dateA > dateB) return 1
                        return 0
                      }).reverse())
                }
            }
        }

        fetchSessions()

        const subscription = supabase
        .channel('sessions')
        .on('postgres_changes', {event: '*', schema: 'public', table: 'sessions'}, (payload) =>{
                fetchSessions()
            
        }).subscribe()

        return () => {
            supabase.removeChannel(subscription)
        }
    },[user])

    return(
        <Box>
            {sessions.map((session) => (
                <SessionCard key={session.id} user={user} session={session} />
            ))}
        </Box>
    );
}