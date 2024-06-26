import { Flex, Box, Text, Link } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Logo from '../../public/logo.png';

const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 100;
      setIsVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      bg="#06122C"
      color="e6e6e9"
      wrap="wrap"
      position="fixed"
      top={isVisible ? "0" : "-70px"}
      left="0"
      width="100%"
      zIndex="999"
      transition="top 0.3s"
      onMouseEnter={handleMouseEnter}
    >
      <Flex direction='row' align="center">
        <a onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
          <Image src={Logo} alt="Logo" width="50" height="50" />
        </a>
        <Text fontSize="25" fontWeight="bold" color='white' p="1" pl='3'>
          Stellar Yield
        </Text>
      </Flex>

      <Box display="flex" gap="20px">
        <Link
          position="relative"
          color='#e6e6e9'
          onClick={() => scrollToSection('main')}
          _hover={{
            _after: {
              content: `""`,
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "2px",
              backgroundColor: "#D0CEBA",
              transform: "scaleX(1)",
              transition: "transform .3s ease-in-out",
            },
          }}
          _after={{
            content: `""`,
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#e6e6e9",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .3s ease-in-out",
          }}
          sx={{
            "&:hover::after": {
              transform: "scaleX(1)",
            },
          }}
        >
          Get Test Tokens
        </Link>

        <Link
          position="relative"
          color='#e6e6e9'
          onClick={() => scrollToSection('stakeStellar')}
          _hover={{
            _after: {
              content: `""`,
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "2px",
              backgroundColor: "#D0CEBA",
              transform: "scaleX(1)",
              transition: "transform .3s ease-in-out",
            },
          }}
          _after={{
            content: `""`,
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#e6e6e9",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .3s ease-in-out",
          }}
          sx={{
            "&:hover::after": {
              transform: "scaleX(1)",
            },
          }}
        >
          Stake $STELLAR
        </Link>
        <Link
          position="relative"
          color='#e6e6e9'
          onClick={() => scrollToSection('stakeMatic')}
          _hover={{
            _after: {
              content: `""`,
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "2px",
              backgroundColor: "#e6e6e9",
              transform: "scaleX(1)",
              transition: "transform .3s ease-in-out",
            },
          }}
          _after={{
            content: `""`,
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#e6e6e9",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .3s ease-in-out",
          }}
          sx={{
            "&:hover::after": {
              transform: "scaleX(1)",
            },
          }}
        >
          Stake $MATIC
        </Link>
        <Link
          position="relative"
          color='#e6e6e9'
          onClick={() => scrollToSection('lottery')}
          _hover={{
            _after: {
              content: `""`,
              position: "absolute",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "2px",
              backgroundColor: "#e6e6e9",
              transform: "scaleX(1)",
              transition: "transform .3s ease-in-out",
            },
          }}
          _after={{
            content: `""`,
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "2px",
            backgroundColor: "#e6e6e9",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform .3s ease-in-out",
          }}
          sx={{
            "&:hover::after": {
              transform: "scaleX(1)",
            },
          }}
        >
          Lottery
        </Link>
      </Box>

      <ConnectButton />
    </Flex>
  );
}

export default Header;
