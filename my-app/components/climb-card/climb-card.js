import { createClient } from "@/utils/supabase/client";
import { Button, Card, Divider, Heading, Text } from "@chakra-ui/react";

export default function ClimbCard({ climb , active }) {
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
        <Card w="80%" padding="15px" margin="5px">
            <Heading size='md'>{climb.name}</Heading>
            <Text size='2xl'>{climb.grade}</Text>
            <Text size='lg'>{climb.notes}</Text>
            {active && <Button onClick={deleteClimb} w="20%" colorScheme="red" variant="outline">Delete</Button>}
        </Card>
    );
}