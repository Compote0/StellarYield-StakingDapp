"use client"
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex
        p="2rem"
        justifyContent="center"
        alignItems="center"
    >
        <Text fontSize="sm" color="#D0CEBA">
          Stellar Yield. All rights reserved. &copy; {new Date().getFullYear()}
          </Text>
    </Flex>
  )
}

export default Footer