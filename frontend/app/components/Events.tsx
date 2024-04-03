import React from "react";
import { Box, Flex, Text, Badge, useTheme, Heading, Stack, StackDivider, Circle } from "@chakra-ui/react";
import { useGlobalContext } from "../context/app-context";
import { Event } from "../types/Event";
import {
    SettingsIcon,
    LockIcon,
    AddIcon,
    CheckIcon,
    DownloadIcon,
    AttachmentIcon,
    ArrowRightIcon,
} from '@chakra-ui/icons';

const DisplayIcon = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
        case "SettingsIcon": return <SettingsIcon />;
        case "LockIcon": return <LockIcon />;
        case "AddIcon": return <AddIcon />;
        case "ArrowRightIcon": return <ArrowRightIcon />;
        case "DownloadIcon": return <DownloadIcon />;
        case "CheckIcon": return <CheckIcon />;
        case "AttachmentIcon": return <AttachmentIcon />;
        default: return <SettingsIcon />;
    };
};

const Events = () => {
    const { events } = useGlobalContext();
    const theme = useTheme();

    return (
        <Box
            bg="#373c56"
            borderRadius="md"
            boxShadow="base"
            borderColor="#828595"
            borderWidth="1px"
            maxH="400px"
            minW={{ base: "80%", md: "30%" }}
            overflowY="auto"
            p="5"
        >
            <Heading size='md' color="#cdced4" mb="4">Events Report</Heading>
            <Stack divider={<StackDivider borderColor="#828595" />} spacing='4'>
                {events.map((event: Event, index: number) => (
                    <Flex key={index} align="center">
                        <Circle size='40px' bg='teal.300' color='white' mr={4}>
                            {DisplayIcon({ iconName: event.icon })}
                        </Circle>
                        <Box flex="1">
                            <Flex align="center">
                                <Heading size='xs' color="#cdced4" textTransform='uppercase'>
                                    {event.title}
                                </Heading>
                                <Badge colorScheme="purple" ml="4">
                                    Block #{event.blockNumber}
                                </Badge>
                            </Flex>
                            <Text pt='2' fontSize='sm' color="#cdced4">
                                {event.message}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </Stack>
        </Box>
    );
};
export default Events;
