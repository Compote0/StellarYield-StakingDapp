// use client;
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NotConnected = () => {

  return (
    <Flex height="80vh" alignItems="center" justifyContent="center">
      <Flex direction="column" alignItems="center" textAlign="center">
        <Image src='/logo.png' mb="8" alt="Logo" width='40%' />
        <Heading mb="4" color='#e6e6e9'>Please, connect your wallet</Heading>
        <Text fontSize="md" mb="4" color='#b4b6bf'>
          Connect your wallet to manage your staking positions, and use the entire dapp.
        </Text>
        <ConnectButton />
      </Flex>
    </Flex>
  );
};

export default NotConnected;
