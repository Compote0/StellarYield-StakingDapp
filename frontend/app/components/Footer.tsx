"use client"
import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex
      p="2rem"
      justifyContent="center"
      alignItems="center"
      bg="#06122C"

    >
      <Text fontSize="sm" color="#e6e6e9">
        Stellar Yield. All rights reserved. &copy; {new Date().getFullYear()}
      </Text>
    </Flex>
  )
}

export default Footer