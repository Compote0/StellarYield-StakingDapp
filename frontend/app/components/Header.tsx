'use client';
import { Flex, Box } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link'; 
import Image from 'next/image';
import React from 'react';
import Logo from '../../public/logo.png'; 

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center" 
      justify="space-between"
      padding="1rem"
      bg="#06122C"
      color="white"
    >
      <Box>
        <Link href="/" passHref legacyBehavior>
          <a>
            <Image src={Logo} alt="Logo" width="50" height="50" />
          </a>
        </Link>
      </Box>


        <ConnectButton />
    </Flex>
  )
}

export default Header;
