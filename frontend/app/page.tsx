'use client';
import { useAccount } from "wagmi";
import Staking from "./components/Staking";
import NotConnected from "./components/NotConnected";

export default function Home() {
  const { isConnected } = useAccount();

  return <>{isConnected ? <Staking /> : <NotConnected />}</>;
}
