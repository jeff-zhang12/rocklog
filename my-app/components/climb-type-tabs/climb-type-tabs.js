import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider } from '@chakra-ui/react'
import ClimbForm from '../climb-form/climb-form'
import OutdoorForm from '../outdoor-form/outdoor-form'
import { ApolloProvider } from '@apollo/client'
import apollo from '@/apollo-client'

export default function ClimbTabs( {user, session_id} ) {
    return (
        <div>
            <Tabs variant='enclosed'>
                <TabList>
                    <Tab>Indoor</Tab>
                    <Tab>Outdoor</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ClimbForm user={user} session_id={session_id}/>
                    </TabPanel>
                    <TabPanel>
                        <ApolloProvider client={apollo}>
                            <OutdoorForm user={user} session_id={session_id}/>
                        </ApolloProvider>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}
