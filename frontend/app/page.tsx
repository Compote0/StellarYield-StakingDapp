'use client';
import { useAccount } from "wagmi";
import Main from "./components/Main";
import NotConnected from "./components/NotConnected";
import StakeMatic from "./components/MaticStaking";
import StakeStellar from "./components/StellarStaking";
import Lottery from "./components/lottery";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      {isConnected ?
        <><Main /><StakeStellar /><StakeMatic /><Lottery /></>
        : <NotConnected />}
    </>
  );
}
