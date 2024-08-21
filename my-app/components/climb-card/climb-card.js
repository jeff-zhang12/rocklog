import { createClient } from "@/utils/supabase/client";
import { Button, Card, Heading, Text } from "@chakra-ui/react";

export default function ClimbCard({ climb }) {
    const supabase = createClient()

    async function deleteClimb() {
        const { error } = await supabase
            .from('climbs')
            .delete()
            .eq('id', climb.id)
        if (error) {
            console.error('Error deleting climb:', error)
        }
    };
    return (
        <Card>
            <Heading size='lg'>{climb.name}</Heading>
            <Heading size='md'>{climb.grade}</Heading>
            <Text size='lg'>{climb.notes}</Text>
            <Button onClick={deleteClimb}>Delete</Button>
        </Card>
    );
}