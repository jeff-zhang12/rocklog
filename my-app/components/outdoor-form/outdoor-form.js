import { useEffect, useState } from "react";
import { Input, Button, List, ListItem, Spinner, Text, Link} from "@chakra-ui/react";
import { createClient } from '@/utils/supabase/client'
import { gql, useLazyQuery } from "@apollo/client";



export default function OutdoorForm({ user, session_id }) {
    const supabase = createClient()

    const SEARCH_AREAS = gql`
        query SearchAreas($name: String!) {
            areas(filter: {area_name: {match: $name}}) {
                area_name
                climbs {
                    name
                }
                 ancestors
                children {
                    areaName
                }
            }
        }
    `

    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState("");
    const [SearchAreas, { loading, data }] = useLazyQuery(SEARCH_AREAS)

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('climbs')
                .insert([{

                    creator: user?.id,
                    session: session_id,
                }])
            if (error) throw error
        } catch (error) {
            alert('Error Logging Climb')
        }

    }

    
    useEffect(() => {
        if (search.length > 3) {
            SearchAreas({ variables: { name: search } })
        }
    }, [search, SearchAreas])


    return (
        <div>




            <form id='climb-form' onSubmit={onSubmit}>
                <label>Boulder Name:</label>
                <Input colorScheme='teal' name='name' placeholder='"Warmup Boulder" Or "XXX Boulder"' onChange={(e) => setSearch(e.target.value)} />
                {loading && <Spinner />}
                {data && (
                    <List>
                        {data.areas.map((area) => (
                            <ListItem key={area.area_name}>{area.area_name}</ListItem>
                        ))}
                    </List>
                )}
                <label>Climb Notes: </label>
                <Input colorScheme='teal' name='notes' placeholder='Type here...' onChange={(e) => setNotes(e.target.value)} />
                <Button colorScheme='teal' type='submit'>Add Climb</Button>
            </form>

            <Text> Powered By <Link color='teal.500' href='https://openbeta.io'>Open Beta</Link></Text>

        </div>
    )
}