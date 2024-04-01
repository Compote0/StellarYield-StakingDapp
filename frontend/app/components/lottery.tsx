import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

export default function Lottery() {
    return (
        <Flex
            id='lottery'
            height="100vh"
            direction="column"
            alignItems="center"
            justifyContent="center"
            backgroundColor="#06122C"
        >
            <Text fontSize="5xl" color="white">
                Lottery - Coming Soon
            </Text>
        </Flex >
    );
}
