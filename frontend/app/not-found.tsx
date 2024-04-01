'use client';;
import BackButton from './components/BackButton';
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function NotFound() {
  return (
    <Flex
      direction='column'
      alignItems="center"
      justify="center"
    >
      <Text color='white'>404 - Page non trouvée </Text>
      <BackButton />
    </Flex>
  );
}

export default NotFound;
