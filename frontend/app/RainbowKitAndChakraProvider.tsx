'use client';
import { ChakraProvider } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  hardhat
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from 'react';
import { polygonMumbai } from './utils/polygonMumbai';

const WALLETCONNECT_PROJECTID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID || "";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: WALLETCONNECT_PROJECTID,
  chains: [polygonMumbai],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

interface RainbowKitAndChakraProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const RainbowKitAndChakraProvider = ({ children }: RainbowKitAndChakraProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} coolMode>
          <ChakraProvider toastOptions={{
            defaultOptions: {
              duration: 6000,
              isClosable: true,
              position: "bottom"
            }
          }}

          >
            {children}
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKitAndChakraProvider;
