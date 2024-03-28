"use client";
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import Staking from './Staking.tsx';
import { Flex } from '@chakra-ui/react';
import { useAccount } from "wagmi";
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isConnected } = useAccount();

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      minH="100vh"
      alignItems="stretch"
    >
      <Header />
      {isConnected && <Staking />}      
      <Flex
        grow="1"
        p="2rem"
        direction="column"
        flex="1"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}

export default Layout;
