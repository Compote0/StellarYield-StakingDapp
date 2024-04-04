import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";
import "hardhat-gas-reporter";
import "solidity-coverage";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "";

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		mumbai: {
			url: MUMBAI_RPC_URL,
			accounts: [`0x${PRIVATE_KEY}`],
			chainId: 80001,
			blockConfirmations: 6,
		},
		sepolia: {
			url: SEPOLIA_RPC_URL,
			accounts: [`0x${PRIVATE_KEY}`],
			chainId: 11155111,
			blockConfirmations: 6,
		},
		localhost: {
			url: "http://127.0.0.1:8545",
			chainId: 31337,
		},
	},
	gasReporter: {
		enabled: true,
	},
	etherscan: {
		apiKey: POLYGONSCAN_API_KEY,
	},
	solidity: {
		compilers: [
			{
				version: "0.8.24",
			},
		],
	},
};
