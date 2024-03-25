import { getAddress } from "viem";
export const contractAddress = getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string) || undefined;
export const contractAbi = [];
