"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { contractAddress, contractAbi } from "../constants/index";
import { useReadContract, useAccount } from "wagmi";
import { parseAbiItem } from "viem";
import { publicClient } from "../utils/client";


type globalContextType = {
    events: Event[];
	getEvents: () => void;
};

const globalContextDefaultValues: globalContextType = {
    events: [],
	getEvents: () => { },
};

const GlobalContext = createContext<globalContextType>(globalContextDefaultValues);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
	children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
	const { address } = useAccount();


    // Read and get events
    const [events, setEvents] = useState<Event[]>([]);
    const deployedBlockNumber = process.env.NEXT_PUBLIC_DEPLOYED_BLOCKNUMBER || 0;
	const getEvents = async () => {
		const voterRegisteredEvent = await publicClient.getLogs({
			address: contractAddress,
			event: parseAbiItem(
				"event VoterRegistered(address voterAddress)"
			),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});
    };

	useEffect(() => {
		const getAllEvents = async () => {
			if (address !== undefined) {
				await getEvents();
			}
		};
		getAllEvents();
	}, [address]);

	// create globalContext value
	const value: globalContextType = {
        events: events,
		getEvents: getEvents,
	}

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
