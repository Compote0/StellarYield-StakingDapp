'use client';
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { MdOutlineHowToVote } from "react-icons/md";

const NotConnected = () => {

  return (
    <Box textAlign="center" p="4" mt='50'>
      <Flex direction="column" justifyContent="center" alignItems="center" >
        <Box mb="4">
          <Text fontSize="lg" mt="2" color="#E9D2C0">
            Please connect your wallet to continue.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default NotConnected;
