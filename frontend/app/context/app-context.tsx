"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { stakingStellarAddress, stakingStellarAbi } from "../constants/stakingStellar";
import { useReadContract, useAccount } from "wagmi";
import { parseAbiItem } from "viem";
import { publicClient } from "../utils/client";
import { Event } from "../types/event";
import { User } from "../types/user";
import { shortenAddress } from "../utils/shortenAddress";
import mockEvents from "../utils/mockEvents";
import { ethers } from "ethers";
import { BigNumberish } from 'ethers';
import { stellarTokenAbi, stellarTokenAddress } from "../constants/stellarToken";


type globalContextType = {
	events: Event[];
	getEvents: () => void;
	isApproved: boolean;
	approveToken: (approvalStatus: boolean) => void;
	userDetails: User | null;
	fetchUserDetails: () => void;
	userBalance: BigNumberish;
	refetchBalance: () => void;
	fetchUserBalance: () => void;
};

const globalContextDefaultValues: globalContextType = {
	events: [],
	getEvents: () => { },
	isApproved: false,
	approveToken: () => { },
	userDetails: null,
	fetchUserDetails: () => { },
	userBalance: 0,
	refetchBalance: () => { },
	fetchUserBalance: () => { }
};

const GlobalContext = createContext<globalContextType>(globalContextDefaultValues);

export const useGlobalContext = () => useContext(GlobalContext);

type Props = {
	children: ReactNode;
};

export const GlobalContextProvider = ({ children }: Props) => {
	const [isApproved, setIsApproved] = useState(false);
	const { address } = useAccount();

	const [events, setEvents] = useState<Event[]>(mockEvents);
	const deployedBlockNumber = process.env.NEXT_PUBLIC_DEPLOYED_BLOCKNUMBER || 0;
	const [userDetails, setUserDetails] = useState<User | null>(null);
	const [userBalance, setUserBalance] = useState<BigNumberish>(0);

	// Approve the token
	const approveToken = (approvalStatus: boolean) => {
		setIsApproved(approvalStatus);
	};

	// Get the user details
	const { data, refetch } = useReadContract({
		address: stakingStellarAddress,
		abi: stakingStellarAbi,
		functionName: 'getUserDetails',
		args: [address],
	});

	//Get the user STELLAR balance
	const {
		data: balanceData,
		refetch: refetchBalance,
	} = useReadContract({
		address: stellarTokenAddress,
		abi: stellarTokenAbi,
		functionName: "balanceOf",
		args: [address],
	});


	// Read and get the events
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

		const combinedEvents: Event[] = [deployEvent]
			.concat(
				stakedEvent.map(event => ({
					icon: "LockIcon",
					title: "Staked",
					message: event.args.amount !== undefined
						? `Address ${shortenAddress(event.args.user)} staked ${parseFloat(ethers.formatUnits(event.args.amount, 18)).toFixed(3)} STELLAR.`
						: 'Staking event detected without amount specified.',
					blockNumber: Number(event.blockNumber),
				})),
				withdrawnEvent.map(event => ({
					icon: "DownloadIcon",
					title: "Withdrawn",
					message: event.args.amount !== undefined && event.args.user !== undefined
						? `Address ${shortenAddress(event.args.user)} withdrawn ${parseFloat(ethers.formatUnits(event.args.amount, 18)).toFixed(3)} STELLAR.`
						: 'Withdrawal event detected without complete details.',
					blockNumber: Number(event.blockNumber),
				})),
				rewardPaidEvent.map(event => ({
					icon: "CheckIcon",
					title: "Reward Paid",
					message: event.args.reward !== undefined && event.args.user !== undefined
						? `Address ${shortenAddress(event.args.user)} received a reward of ${parseFloat(ethers.formatUnits(event.args.reward, 18)).toFixed(3)} STELLAR.`
						: 'Reward payment event detected without complete details.',
					blockNumber: Number(event.blockNumber),
				}))
			);
		combinedEvents.sort((a, b) => b.blockNumber - a.blockNumber);

		setEvents(combinedEvents);
	};

	useEffect(() => {
		if (balanceData) {
			const formattedBalance = parseFloat(ethers.formatEther(balanceData)).toFixed(2);
			setUserBalance(formattedBalance);
		}
	}, [balanceData]);

	// useeffect to get the user details
	useEffect(() => {
		if (data) {
			const [stakedAmountBN, pendingRewardsBN, unlockTimeBN] = data as [BigNumberish, BigNumberish, BigNumberish];
			const details: User = {
				stakedAmount: parseFloat(ethers.formatEther(stakedAmountBN)),
				pendingRewards: parseFloat(ethers.formatEther(pendingRewardsBN)),
				unlockTime: Number(unlockTimeBN),
			};
			setUserDetails(details);
		}
	}, [data]);

	// useeffect to get the events
	useEffect(() => {
		const getAllEvents = async () => {
			if (address !== undefined) {
				await getEvents();
			}
		};
		getAllEvents();
	}, [address]);

	const fetchUserDetails = () => {
		if (address) {
			refetch();
		}
	};

	const fetchUserBalance = () => {
		refetchBalance();
	};

	const value = {
		events,
		getEvents,
		isApproved,
		approveToken,
		userDetails,
		userBalance,
		fetchUserDetails,
		fetchUserBalance,
		refetchBalance
	};

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};