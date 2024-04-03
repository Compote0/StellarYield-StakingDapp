"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { stakingStellarAddress, stakingStellarAbi } from "../constants/stakingStellar";
import { useReadContract, useAccount } from "wagmi";
import { parseAbiItem } from "viem";
import { publicClient } from "../utils/client";
import { Event } from "../types/Event";
import { shortenAddress } from "../utils/shortenAddress";
import mockEvents from "../utils/mockEvents";

type globalContextType = {
	events: Event[];
	getEvents: () => void;
	isApproved: boolean;
	approveToken: (approvalStatus: boolean) => void;
};

const globalContextDefaultValues: globalContextType = {
	events: [],
	getEvents: () => { },
	isApproved: false,
	approveToken: () => { },
};

const GlobalContext = createContext<globalContextType>(globalContextDefaultValues);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
	children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
	const [isApproved, setIsApproved] = useState(false);

	const approveToken = (approvalStatus: boolean) => {
		setIsApproved(approvalStatus);
	};


	const { address } = useAccount();

	const [events, setEvents] = useState<Event[]>(mockEvents);
	const deployedBlockNumber = process.env.NEXT_PUBLIC_DEPLOYED_BLOCKNUMBER || 0;

	const getEvents = async () => {
		const stakedEvent = await publicClient.getLogs({
			address: stakingStellarAddress,
			event: parseAbiItem("event Staked(address indexed user, uint256 amount)"),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const withdrawnEvent = await publicClient.getLogs({
			address: stakingStellarAddress,
			event: parseAbiItem("event Withdrawn(address indexed user, uint256 amount)"),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const rewardPaidEvent = await publicClient.getLogs({
			address: stakingStellarAddress,
			event: parseAbiItem("event RewardPaid(address indexed user, uint256 reward)"),
			fromBlock: BigInt(deployedBlockNumber),
			toBlock: "latest",
		});

		const deployEvent: Event = {
			icon: "SettingsIcon",
			title: "Contract Deployed",
			message: `Staking contract has been deployed at block ${deployedBlockNumber}.`,
			blockNumber: Number(deployedBlockNumber),
		};

		const combinedEvents: Event[] = [deployEvent].concat(
			stakedEvent.map(event => ({
				icon: "LockIcon",
				title: "Staked",
				message: `Address ${shortenAddress(event.args.user)} staked ${event.args.amount} tokens.`,
				blockNumber: Number(event.blockNumber),
			})),
			withdrawnEvent.map(event => ({
				icon: "DownloadIcon",
				title: "Withdrawn",
				message: `Address ${shortenAddress(event.args.user)} withdrawn ${event.args.amount} tokens.`,
				blockNumber: Number(event.blockNumber),
			})),
			rewardPaidEvent.map(event => ({
				icon: "CheckIcon",
				title: "Reward Paid",
				message: `Address ${shortenAddress(event.args.user)} received a reward of ${event.args.reward} tokens.`,
				blockNumber: Number(event.blockNumber),
			}))
		);

		combinedEvents.sort((a, b) => b.blockNumber - a.blockNumber);

		setEvents(combinedEvents);
	};

	useEffect(() => {
		if (address !== undefined) {
			getEvents();
		}
	}, [address]);

	const value = {
		events,
		getEvents,
		isApproved,
		approveToken,
	};

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};