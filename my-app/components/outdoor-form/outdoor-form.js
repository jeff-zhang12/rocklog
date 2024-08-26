import { useEffect, useState } from "react";
import {
    Input,
    Button,
    Spinner,
    Text,
    Link,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Divider,
    Radio,
    RadioGroup,
    Stack,
} from "@chakra-ui/react";
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
                    grades {
                        vscale
                        yds
                    }
                    uuid
                }
                 ancestors
                children {
                    areaName
                }
                 uuid
            }
        }
    `

    const GET_AREA_NAME = gql`
        query GetAreaName ($id: ID!){
            area(uuid: $id) {
                area_name
            }
        }
    `

    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState("");
    const [name, setName] = useState("")
    const [grade, setGrade] = useState("")
    const [radioValue,setRadioValue] = useState("")
    const [areaNames, setAreaNames] = useState({})
    const [SearchAreas, { loading, data }] = useLazyQuery(SEARCH_AREAS)
    const [GetAreaName] = useLazyQuery(GET_AREA_NAME)

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('climbs')
                .insert([{
                    name: name,
                    grade: grade,
                    notes: notes,
                    creator: user?.id,
                    session: session_id,
                }])
            if (error) throw error
        } catch (error) {
            alert('Error Logging Climb')
        }

    }
    function selectClimb(climb){
        console.log(climb)
        setRadioValue(climb.uuid)
        setName(climb.name)
        setGrade(climb.grades?.vscale || climb.grades?.yds || 'No Grade')
    }


    useEffect(() => {
        if (search.length > 3) {
            SearchAreas({ variables: { name: search } })
        }
    }, [search, SearchAreas])

    useEffect(() => {
        if (data && data.areas) {
            data.areas.forEach(async area => {
                const ancestorID = area.ancestors[1]
                const { data: ancestorData } = await GetAreaName({ variables: { id: ancestorID } })
                if (ancestorData && !areaNames[ancestorID]) {
                    setAreaNames(prev => ({
                        ...prev, [ancestorID]: ancestorData.area.area_name
                    }))
                }

            });
        }
    }, [data, GetAreaName])


    return (
        <div>




            <form id='climb-form' onSubmit={onSubmit}>
                <label>Boulder Name:</label>
                <Input colorScheme='teal' name='name' placeholder='"Warmup Boulder" Or "XXX Boulder"' onChange={(e) => setSearch(e.target.value)} />
                {loading && <Spinner />}
                {data && search.length > 3 && (
                    <Accordion allowToggle>
                        {data.areas.map((area) => (

                            area.climbs.length > 0 && (<AccordionItem key={area.area_name}>
                                <h2>
                                    <AccordionButton>
                                        <Box as='span' flex='1' textAlign='left'>
                                            {area.area_name} - {areaNames[area.ancestors[1]]}
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <RadioGroup 
                                    onChange={(climbID) => {
                                        selectClimb(area.climbs.find(climb =>climb.uuid ===climbID))
                                        }
                                    } 
                                    value={radioValue}>
                                        <Stack>
                                            {area.climbs.map((climb) => (
                                                <Radio key={climb} value={climb.uuid}>
                                                    {climb?.name} - {climb.grades?.vscale || climb.grades?.yds || 'No Grade'}
                                                </Radio>
                                            ))}
                                        </Stack>
                                    </RadioGroup>

                                </AccordionPanel>
                            </AccordionItem>)
                        ))}
                    </Accordion>
                )}
                <Divider></Divider>
                <label>Climb Notes: </label>
                <Input colorScheme='teal' name='notes' placeholder='Type here...' onChange={(e) => setNotes(e.target.value)} />
                <Button colorScheme='teal' type='submit'>Add Climb</Button>
            </form>

            <Text> Powered By <Link color='teal.500' href='https://openbeta.io'>Open Beta</Link></Text>
        </div>
    )
}