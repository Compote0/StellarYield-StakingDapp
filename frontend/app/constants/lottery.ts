import { getAddress } from "viem";

export const lotteryAddress = getAddress(process.env.NEXT_PUBLIC_LOTTERY_ADDRESS as string) || undefined;
export const lotteryAbi = [];
