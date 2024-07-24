import { Button, Heading, Card } from "@chakra-ui/react";
import SessionForm from "../session-form/session-form";
import { createClient } from "@/utils/supabase/client";

export default function SessionCard( { user, session } ){
    const supabase = createClient()

    async function deleteSession() {
        const { error } = await supabase
            .from('sessions')
            .delete()
            .eq('id', session.id)

    };
    return(
        <Card>
            <Heading size='lg'>{session.id}</Heading>
            <SessionForm user={user} id={session.id} active={session.active}/>
            <Button onClick={deleteSession}>Delete</Button>
        </Card>
    );
}