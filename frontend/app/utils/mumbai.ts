import { defineChain } from "viem";

const MUMBAI_RPC_URL = process.env.NEXT_PUBLIC_MUMBAI_RPC_URL || "";

export const mumbai = /*#__PURE__*/ defineChain({
    id: 80001,
    name: "Sepolia",
    nativeCurrency: { name: "Mumbai Matic", symbol: "MATIC", decimals: 18 },
    rpcUrls: {
        default: {
            http: [MUMBAI_RPC_URL],
        },
    },
    blockExplorers: {
        default: {
            name: "Etherscan",
            url: "https://mumbai.polygonscan.com",
            apiUrl: "https://api-testnet.polygonscan.com/api",
        },
    },
    contracts: {
        multicall3: {
            address: "0xcA11bde05977b3631167028862bE2a173976CA11",
            blockCreated: 751532,
        },
        ensRegistry: { address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e" },
        ensUniversalResolver: {
            address: "0xc8Af999e38273D658BE1b921b88A9Ddf005769cC",
            blockCreated: 5_317_080,
        },
    },
    testnet: true,
});
