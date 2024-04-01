"use client";
import Header from './Header';
import Footer from './Footer';
import { Flex } from '@chakra-ui/react';
import { useAccount } from "wagmi";
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      minH="100vh"
      alignItems="stretch"
    >
      <Header />
      <Flex
        grow="1"
        p="2rem"
        direction="column"
        flex="1"
        alignItems="stretch"
        bg="#06122C"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Layout;
