'use client';

import { useRouter } from 'next/navigation';
import { Flex, Button } from '@chakra-ui/react';
import React from 'react';

function BackButton() {
  const router = useRouter();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      justify="center"
      p="2rem"
    >
      <Button onClick={() => router.back()} variant="outline" bg='white'>
        Get Started
      </Button>
    </Flex>
  );
}

export default BackButton;
