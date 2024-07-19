import { Card, CardBody, CardHeader, Heading, Text} from "@chakra-ui/react";

export default function Post(){
    return(
        <Card maxW='sm'>
            <CardHeader>
                <Heading>Post</Heading>
            </CardHeader>
            <CardBody>
                <Text>Post Detail</Text>
            </CardBody>
        </Card>
    );
}