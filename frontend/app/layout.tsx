import RainbowKitAndChakraProvider from "./RainbowKitAndChakraProvider";
import Layout from "./components/Layout.tsx";
import { ReactNode } from 'react';
import { Inter } from "next/font/google";
import { GlobalContextProvider } from "./context/app-context.tsx";


export const metadata = {
  title: "Stellar Yield - Staking Dapp",
  description: "A staking and lottery dapp",
};

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitAndChakraProvider>
          <GlobalContextProvider>
            <Layout>
              {children}
            </Layout>
          </GlobalContextProvider>
        </RainbowKitAndChakraProvider>
      </body>
    </html>
  );
}
