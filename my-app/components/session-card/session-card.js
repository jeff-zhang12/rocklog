import { Button, Heading, Card, Stack, Text } from "@chakra-ui/react";
import SessionForm from "../session-form/session-form";
import { createClient } from "@/utils/supabase/client";

export default function SessionCard({ user, session }) {
    const supabase = createClient()

    async function deleteSession() {
        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', session.id)
        if (error) {
            console.error('Error deleting session:', error)
        }

    };
    return (
        <Card padding="15px" margin="5px" w="90%">
            <Heading size='md'>{session.name}</Heading>
            <Text size='xs' color="gray">
                    {new Date(session.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
            <Text size='md'>{session.notes}</Text>
            <Stack direction="row">
                <SessionForm user={user} id={session.id} active={session.active} />
                <Button onClick={deleteSession} w="20%" colorScheme="red" variant="outline">Delete</Button>
            </Stack>

        </Card>
    );
}