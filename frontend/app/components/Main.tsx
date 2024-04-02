'use client';
import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import FaucetStellarToken from "./FaucetStellarToken";

const Main = () => {
    return (
        <Flex direction="column" align="center" justify="center" gap="6" p="4" id="main" height="100vh">
            <Heading as="h1" size="xl" color='white'>Welcome to Stellar Yield</Heading>
            <Text fontSize="lg" color='#cdced4'>Stake tokens, play the lottery, and earn ! Before that, make sure to have MATIC and STELLAR in your wallet.</Text>
            <FaucetStellarToken />
        </Flex>
    );
};

export default Main;

