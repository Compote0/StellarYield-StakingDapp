import { getAddress } from "viem";
export const stakingAddress = getAddress(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string) || undefined;
export const stellarTokenAddress = getAddress(process.env.NEXT_PUBLIC_STELLAR_TOKEN_ADDRESS as string) || undefined;
export const stakingStellarAddress = getAddress(process.env.NEXT_PUBLIC_STAKING_STELLAR_ADDRESS as string) || undefined;
export const stakingAbi = [
    {
        "_format": "hh-sol-artifact-1",
        "contractName": "Staking",
        "sourceName": "contracts/Staking.sol",
        "abi": [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "allowance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                    }
                ],
                "name": "ERC20InsufficientAllowance",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                    }
                ],
                "name": "ERC20InsufficientBalance",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "approver",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidApprover",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidReceiver",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidSender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidSpender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "inputs": [],
                "name": "ReentrancyGuardReentrantCall",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "reward",
                        "type": "uint256"
                    }
                ],
                "name": "Claimed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "Staked",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "time",
                        "type": "uint256"
                    }
                ],
                "name": "Withdrawn",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "BASE_APR",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAX_APR",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MAX_TOTAL_STAKED",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "MIN_APR",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "WEEK",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "apr",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "userStakedAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timeStaked",
                        "type": "uint256"
                    }
                ],
                "name": "calculateReward",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "claim",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getTotalStakedBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getUserBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "lastClaimTime",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "lockPeriod",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "lockTime",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "stake",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "stakedBalances",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "stellarToken",
                "outputs": [
                    {
                        "internalType": "contract StellarToken",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "linkReferences": {},
        "deployedLinkReferences": {}
    }
];

export const stellarTokenAbi = [
    {
        "_format": "hh-sol-artifact-1",
        "contractName": "StellarToken",
        "sourceName": "contracts/StellarToken.sol",
        "abi": [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "allowance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                    }
                ],
                "name": "ERC20InsufficientAllowance",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "balance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "needed",
                        "type": "uint256"
                    }
                ],
                "name": "ERC20InsufficientBalance",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "approver",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidApprover",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidReceiver",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidSender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "ERC20InvalidSpender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "decimals",
                "outputs": [
                    {
                        "internalType": "uint8",
                        "name": "",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "faucet",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalSupply",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": "0x60806040523480156200001157600080fd5b50336040518060400160405280601381526020017f5374656c6c6172205969656c6420546f6b656e000000000000000000000000008152506040518060400160405280600781526020017f5354454c4c415200000000000000000000000000000000000000000000000000815250816003908162000090919062000761565b508060049081620000a2919062000761565b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200011a5760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016200011191906200088d565b60405180910390fd5b6200012b816200016460201b60201c565b506200015e336012600a62000141919062000a3a565b633b9aca0062000152919062000a8b565b6200022a60201b60201c565b62000b7c565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200029f5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016200029691906200088d565b60405180910390fd5b620002b360008383620002b760201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200030d57806002600082825462000300919062000ad6565b92505081905550620003e3565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156200039c578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620003939392919062000b22565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200042e57806002600082825403925050819055506200047b565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620004da919062000b5f565b60405180910390a3505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200056957607f821691505b6020821081036200057f576200057e62000521565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005e97fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620005aa565b620005f58683620005aa565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620006426200063c62000636846200060d565b62000617565b6200060d565b9050919050565b6000819050919050565b6200065e8362000621565b620006766200066d8262000649565b848454620005b7565b825550505050565b600090565b6200068d6200067e565b6200069a81848462000653565b505050565b5b81811015620006c257620006b660008262000683565b600181019050620006a0565b5050565b601f8211156200071157620006db8162000585565b620006e6846200059a565b81016020851015620006f6578190505b6200070e62000705856200059a565b8301826200069f565b50505b505050565b600082821c905092915050565b6000620007366000198460080262000716565b1980831691505092915050565b600062000751838362000723565b9150826002028217905092915050565b6200076c82620004e7565b67ffffffffffffffff811115620007885762000787620004f2565b5b62000794825462000550565b620007a1828285620006c6565b600060209050601f831160018114620007d95760008415620007c4578287015190505b620007d0858262000743565b86555062000840565b601f198416620007e98662000585565b60005b828110156200081357848901518255600182019150602085019450602081019050620007ec565b868310156200083357848901516200082f601f89168262000723565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620008758262000848565b9050919050565b620008878162000868565b82525050565b6000602082019050620008a460008301846200087c565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b6001851115620009385780860481111562000910576200090f620008aa565b5b6001851615620009205780820291505b80810290506200093085620008d9565b9450620008f0565b94509492505050565b60008262000953576001905062000a26565b8162000963576000905062000a26565b81600181146200097c57600281146200098757620009bd565b600191505062000a26565b60ff8411156200099c576200099b620008aa565b5b8360020a915084821115620009b657620009b5620008aa565b5b5062000a26565b5060208310610133831016604e8410600b8410161715620009f75782820a905083811115620009f157620009f0620008aa565b5b62000a26565b62000a068484846001620008e6565b9250905081840481111562000a205762000a1f620008aa565b5b81810290505b9392505050565b600060ff82169050919050565b600062000a47826200060d565b915062000a548362000a2d565b925062000a837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000941565b905092915050565b600062000a98826200060d565b915062000aa5836200060d565b925082820262000ab5816200060d565b9150828204841483151762000acf5762000ace620008aa565b5b5092915050565b600062000ae3826200060d565b915062000af0836200060d565b925082820190508082111562000b0b5762000b0a620008aa565b5b92915050565b62000b1c816200060d565b82525050565b600060608201905062000b3960008301866200087c565b62000b48602083018562000b11565b62000b57604083018462000b11565b949350505050565b600060208201905062000b76600083018462000b11565b92915050565b6113578062000b8c6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063715018a61161008c578063a9059cbb11610066578063a9059cbb14610204578063dd62ed3e14610234578063de5f72fd14610264578063f2fde38b1461026e576100cf565b8063715018a6146101be5780638da5cb5b146101c857806395d89b41146101e6576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce5671461017057806370a082311461018e575b600080fd5b6100dc61028a565b6040516100e99190610deb565b60405180910390f35b61010c60048036038101906101079190610ea6565b61031c565b6040516101199190610f01565b60405180910390f35b61012a61033f565b6040516101379190610f2b565b60405180910390f35b61015a60048036038101906101559190610f46565b610349565b6040516101679190610f01565b60405180910390f35b610178610378565b6040516101859190610fb5565b60405180910390f35b6101a860048036038101906101a39190610fd0565b610381565b6040516101b59190610f2b565b60405180910390f35b6101c66103c9565b005b6101d06103dd565b6040516101dd919061100c565b60405180910390f35b6101ee610407565b6040516101fb9190610deb565b60405180910390f35b61021e60048036038101906102199190610ea6565b610499565b60405161022b9190610f01565b60405180910390f35b61024e60048036038101906102499190611027565b6104bc565b60405161025b9190610f2b565b60405180910390f35b61026c610543565b005b61028860048036038101906102839190610fd0565b610568565b005b60606003805461029990611096565b80601f01602080910402602001604051908101604052809291908181526020018280546102c590611096565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b6000806103276105ee565b90506103348185856105f6565b600191505092915050565b6000600254905090565b6000806103546105ee565b9050610361858285610608565b61036c85858561069c565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6103d1610790565b6103db6000610817565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461041690611096565b80601f016020809104026020016040519081016040528092919081815260200182805461044290611096565b801561048f5780601f106104645761010080835404028352916020019161048f565b820191906000526020600020905b81548152906001019060200180831161047257829003601f168201915b5050505050905090565b6000806104a46105ee565b90506104b181858561069c565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610566336012600a6105559190611229565b600a6105619190611274565b6108dd565b565b610570610790565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105e25760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016105d9919061100c565b60405180910390fd5b6105eb81610817565b50565b600033905090565b610603838383600161095f565b505050565b600061061484846104bc565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146106965781811015610686578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161067d939291906112b6565b60405180910390fd5b6106958484848403600061095f565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361070e5760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610705919061100c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107805760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610777919061100c565b60405180910390fd5b61078b838383610b36565b505050565b6107986105ee565b73ffffffffffffffffffffffffffffffffffffffff166107b66103dd565b73ffffffffffffffffffffffffffffffffffffffff1614610815576107d96105ee565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161080c919061100c565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361094f5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610946919061100c565b60405180910390fd5b61095b60008383610b36565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036109d15760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016109c8919061100c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a435760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a3a919061100c565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610b30578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b279190610f2b565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b88578060026000828254610b7c91906112ed565b92505081905550610c5b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c14578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c0b939291906112b6565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ca45780600260008282540392505081905550610cf1565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d4e9190610f2b565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d95578082015181840152602081019050610d7a565b60008484015250505050565b6000601f19601f8301169050919050565b6000610dbd82610d5b565b610dc78185610d66565b9350610dd7818560208601610d77565b610de081610da1565b840191505092915050565b60006020820190508181036000830152610e058184610db2565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e3d82610e12565b9050919050565b610e4d81610e32565b8114610e5857600080fd5b50565b600081359050610e6a81610e44565b92915050565b6000819050919050565b610e8381610e70565b8114610e8e57600080fd5b50565b600081359050610ea081610e7a565b92915050565b60008060408385031215610ebd57610ebc610e0d565b5b6000610ecb85828601610e5b565b9250506020610edc85828601610e91565b9150509250929050565b60008115159050919050565b610efb81610ee6565b82525050565b6000602082019050610f166000830184610ef2565b92915050565b610f2581610e70565b82525050565b6000602082019050610f406000830184610f1c565b92915050565b600080600060608486031215610f5f57610f5e610e0d565b5b6000610f6d86828701610e5b565b9350506020610f7e86828701610e5b565b9250506040610f8f86828701610e91565b9150509250925092565b600060ff82169050919050565b610faf81610f99565b82525050565b6000602082019050610fca6000830184610fa6565b92915050565b600060208284031215610fe657610fe5610e0d565b5b6000610ff484828501610e5b565b91505092915050565b61100681610e32565b82525050565b60006020820190506110216000830184610ffd565b92915050565b6000806040838503121561103e5761103d610e0d565b5b600061104c85828601610e5b565b925050602061105d85828601610e5b565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110ae57607f821691505b6020821081036110c1576110c0611067565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111561114d57808604811115611129576111286110c7565b5b60018516156111385780820291505b8081029050611146856110f6565b945061110d565b94509492505050565b6000826111665760019050611222565b816111745760009050611222565b816001811461118a5760028114611194576111c3565b6001915050611222565b60ff8411156111a6576111a56110c7565b5b8360020a9150848211156111bd576111bc6110c7565b5b50611222565b5060208310610133831016604e8410600b84101617156111f85782820a9050838111156111f3576111f26110c7565b5b611222565b6112058484846001611103565b9250905081840481111561121c5761121b6110c7565b5b81810290505b9392505050565b600061123482610e70565b915061123f83610f99565b925061126c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611156565b905092915050565b600061127f82610e70565b915061128a83610e70565b925082820261129881610e70565b915082820484148315176112af576112ae6110c7565b5b5092915050565b60006060820190506112cb6000830186610ffd565b6112d86020830185610f1c565b6112e56040830184610f1c565b949350505050565b60006112f882610e70565b915061130383610e70565b925082820190508082111561131b5761131a6110c7565b5b9291505056fea264697066735822122021c7fc464eb041f7d41ce3ebe820ad1b413d39a517253a8ca316a77071ec4ff564736f6c63430008180033",
        "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063715018a61161008c578063a9059cbb11610066578063a9059cbb14610204578063dd62ed3e14610234578063de5f72fd14610264578063f2fde38b1461026e576100cf565b8063715018a6146101be5780638da5cb5b146101c857806395d89b41146101e6576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce5671461017057806370a082311461018e575b600080fd5b6100dc61028a565b6040516100e99190610deb565b60405180910390f35b61010c60048036038101906101079190610ea6565b61031c565b6040516101199190610f01565b60405180910390f35b61012a61033f565b6040516101379190610f2b565b60405180910390f35b61015a60048036038101906101559190610f46565b610349565b6040516101679190610f01565b60405180910390f35b610178610378565b6040516101859190610fb5565b60405180910390f35b6101a860048036038101906101a39190610fd0565b610381565b6040516101b59190610f2b565b60405180910390f35b6101c66103c9565b005b6101d06103dd565b6040516101dd919061100c565b60405180910390f35b6101ee610407565b6040516101fb9190610deb565b60405180910390f35b61021e60048036038101906102199190610ea6565b610499565b60405161022b9190610f01565b60405180910390f35b61024e60048036038101906102499190611027565b6104bc565b60405161025b9190610f2b565b60405180910390f35b61026c610543565b005b61028860048036038101906102839190610fd0565b610568565b005b60606003805461029990611096565b80601f01602080910402602001604051908101604052809291908181526020018280546102c590611096565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b6000806103276105ee565b90506103348185856105f6565b600191505092915050565b6000600254905090565b6000806103546105ee565b9050610361858285610608565b61036c85858561069c565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6103d1610790565b6103db6000610817565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606004805461041690611096565b80601f016020809104026020016040519081016040528092919081815260200182805461044290611096565b801561048f5780601f106104645761010080835404028352916020019161048f565b820191906000526020600020905b81548152906001019060200180831161047257829003601f168201915b5050505050905090565b6000806104a46105ee565b90506104b181858561069c565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b610566336012600a6105559190611229565b600a6105619190611274565b6108dd565b565b610570610790565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105e25760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016105d9919061100c565b60405180910390fd5b6105eb81610817565b50565b600033905090565b610603838383600161095f565b505050565b600061061484846104bc565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146106965781811015610686578281836040517ffb8f41b200000000000000000000000000000000000000000000000000000000815260040161067d939291906112b6565b60405180910390fd5b6106958484848403600061095f565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361070e5760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610705919061100c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107805760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610777919061100c565b60405180910390fd5b61078b838383610b36565b505050565b6107986105ee565b73ffffffffffffffffffffffffffffffffffffffff166107b66103dd565b73ffffffffffffffffffffffffffffffffffffffff1614610815576107d96105ee565b6040517f118cdaa700000000000000000000000000000000000000000000000000000000815260040161080c919061100c565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361094f5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610946919061100c565b60405180910390fd5b61095b60008383610b36565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16036109d15760006040517fe602df050000000000000000000000000000000000000000000000000000000081526004016109c8919061100c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a435760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a3a919061100c565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610b30578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b279190610f2b565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b88578060026000828254610b7c91906112ed565b92505081905550610c5b565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c14578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c0b939291906112b6565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ca45780600260008282540392505081905550610cf1565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d4e9190610f2b565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d95578082015181840152602081019050610d7a565b60008484015250505050565b6000601f19601f8301169050919050565b6000610dbd82610d5b565b610dc78185610d66565b9350610dd7818560208601610d77565b610de081610da1565b840191505092915050565b60006020820190508181036000830152610e058184610db2565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e3d82610e12565b9050919050565b610e4d81610e32565b8114610e5857600080fd5b50565b600081359050610e6a81610e44565b92915050565b6000819050919050565b610e8381610e70565b8114610e8e57600080fd5b50565b600081359050610ea081610e7a565b92915050565b60008060408385031215610ebd57610ebc610e0d565b5b6000610ecb85828601610e5b565b9250506020610edc85828601610e91565b9150509250929050565b60008115159050919050565b610efb81610ee6565b82525050565b6000602082019050610f166000830184610ef2565b92915050565b610f2581610e70565b82525050565b6000602082019050610f406000830184610f1c565b92915050565b600080600060608486031215610f5f57610f5e610e0d565b5b6000610f6d86828701610e5b565b9350506020610f7e86828701610e5b565b9250506040610f8f86828701610e91565b9150509250925092565b600060ff82169050919050565b610faf81610f99565b82525050565b6000602082019050610fca6000830184610fa6565b92915050565b600060208284031215610fe657610fe5610e0d565b5b6000610ff484828501610e5b565b91505092915050565b61100681610e32565b82525050565b60006020820190506110216000830184610ffd565b92915050565b6000806040838503121561103e5761103d610e0d565b5b600061104c85828601610e5b565b925050602061105d85828601610e5b565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110ae57607f821691505b6020821081036110c1576110c0611067565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111561114d57808604811115611129576111286110c7565b5b60018516156111385780820291505b8081029050611146856110f6565b945061110d565b94509492505050565b6000826111665760019050611222565b816111745760009050611222565b816001811461118a5760028114611194576111c3565b6001915050611222565b60ff8411156111a6576111a56110c7565b5b8360020a9150848211156111bd576111bc6110c7565b5b50611222565b5060208310610133831016604e8410600b84101617156111f85782820a9050838111156111f3576111f26110c7565b5b611222565b6112058484846001611103565b9250905081840481111561121c5761121b6110c7565b5b81810290505b9392505050565b600061123482610e70565b915061123f83610f99565b925061126c7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611156565b905092915050565b600061127f82610e70565b915061128a83610e70565b925082820261129881610e70565b915082820484148315176112af576112ae6110c7565b5b5092915050565b60006060820190506112cb6000830186610ffd565b6112d86020830185610f1c565b6112e56040830184610f1c565b949350505050565b60006112f882610e70565b915061130383610e70565b925082820190508082111561131b5761131a6110c7565b5b9291505056fea264697066735822122021c7fc464eb041f7d41ce3ebe820ad1b413d39a517253a8ca316a77071ec4ff564736f6c63430008180033",
        "linkReferences": {},
        "deployedLinkReferences": {}
    }
]

export const stakingStellarAbi = [
    {
        "_format": "hh-sol-artifact-1",
        "contractName": "StakingStellar",
        "sourceName": "contracts/StakingStellar.sol",
        "abi": [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "stellarTokenAddress",
                        "type": "address"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "staker",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "TokensStaked",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "staker",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "rewards",
                        "type": "uint256"
                    }
                ],
                "name": "TokensUnstaked",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "stakerAddress",
                        "type": "address"
                    }
                ],
                "name": "calculateRewards",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "stakerAddress",
                        "type": "address"
                    }
                ],
                "name": "getStakerInfo",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "startTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "stakedTokens",
                                "type": "uint256"
                            },
                            {
                                "internalType": "bool",
                                "name": "isCurrentlyStaking",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct StakingStellar.StakerInfo",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "stake",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "stakingTokenAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalStakedAmount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        "bytecode": "0x608060405260206003553480156200001657600080fd5b50604051620013613803806200136183398181016040528101906200003c9190620002ac565b33600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603620000b25760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620000a99190620002ef565b60405180910390fd5b620000c3816200017e60201b60201c565b50600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160362000136576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200012d9062000393565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050620003b5565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620002748262000247565b9050919050565b620002868162000267565b81146200029257600080fd5b50565b600081519050620002a6816200027b565b92915050565b600060208284031215620002c557620002c462000242565b5b6000620002d58482850162000295565b91505092915050565b620002e98162000267565b82525050565b6000602082019050620003066000830184620002de565b92915050565b600082825260208201905092915050565b7f546f6b656e20616464726573732063616e6e6f7420626520746865207a65726f60008201527f20616464726573732e0000000000000000000000000000000000000000000000602082015250565b60006200037b6029836200030c565b915062000388826200031d565b604082019050919050565b60006020820190508181036000830152620003ae816200036c565b9050919050565b610f9c80620003c56000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063733bdef011610066578063733bdef01461010e5780637547c7a31461013e5780638da5cb5b1461015a578063a5ce413b14610178578063f2fde38b1461018257610093565b80635298b86914610098578063567e98f9146100b657806364ab8675146100d4578063715018a614610104575b600080fd5b6100a061019e565b6040516100ad9190610a43565b60405180910390f35b6100be6101c8565b6040516100cb9190610a77565b60405180910390f35b6100ee60048036038101906100e99190610ac3565b6101ce565b6040516100fb9190610a77565b60405180910390f35b61010c61029b565b005b61012860048036038101906101239190610ac3565b6102af565b6040516101359190610b5c565b60405180910390f35b61015860048036038101906101539190610ba3565b610337565b005b6101626105b1565b60405161016f9190610a43565b60405180910390f35b6101806105da565b005b61019c60048036038101906101979190610ac3565b610806565b005b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60025481565b600080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1615151515815250509050600081600001514261025e9190610bff565b9050600063bbf81e0060035483856020015161027a9190610c33565b6102849190610c33565b61028e9190610ca4565b9050809350505050919050565b6102a361088c565b6102ad6000610913565b565b6102b76109df565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1615151515815250509050919050565b6000811161037a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037190610d32565b60405180910390fd5b60001515600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16151514610410576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040790610dc4565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161046f93929190610de4565b6020604051808303816000875af115801561048e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b29190610e47565b50604051806060016040528042815260200182815260200160011515815250600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff02191690831515021790555090505080600260008282546105599190610e74565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167fb539ca1e5c8d398ddf1c41c30166f33404941683be4683319b57669a93dad4ef826040516105a69190610a77565b60405180910390a250565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060020160009054906101000a900460ff1661066e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066590610ef4565b60405180910390fd5b6000610679336101ce565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb338385600101546106ca9190610e74565b6040518363ffffffff1660e01b81526004016106e7929190610f14565b6020604051808303816000875af1158015610706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072a9190610e47565b508160010154600260008282546107419190610bff565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f6f2d3e000c89d37446b7c0374c0125068ff316d1e3ee302336478a8cd03c2336836001015483604051610794929190610f3d565b60405180910390a2600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008082016000905560018201600090556002820160006101000a81549060ff021916905550505050565b61080e61088c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036108805760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016108779190610a43565b60405180910390fd5b61088981610913565b50565b6108946109d7565b73ffffffffffffffffffffffffffffffffffffffff166108b26105b1565b73ffffffffffffffffffffffffffffffffffffffff1614610911576108d56109d7565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016109089190610a43565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b604051806060016040528060008152602001600081526020016000151581525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a2d82610a02565b9050919050565b610a3d81610a22565b82525050565b6000602082019050610a586000830184610a34565b92915050565b6000819050919050565b610a7181610a5e565b82525050565b6000602082019050610a8c6000830184610a68565b92915050565b600080fd5b610aa081610a22565b8114610aab57600080fd5b50565b600081359050610abd81610a97565b92915050565b600060208284031215610ad957610ad8610a92565b5b6000610ae784828501610aae565b91505092915050565b610af981610a5e565b82525050565b60008115159050919050565b610b1481610aff565b82525050565b606082016000820151610b306000850182610af0565b506020820151610b436020850182610af0565b506040820151610b566040850182610b0b565b50505050565b6000606082019050610b716000830184610b1a565b92915050565b610b8081610a5e565b8114610b8b57600080fd5b50565b600081359050610b9d81610b77565b92915050565b600060208284031215610bb957610bb8610a92565b5b6000610bc784828501610b8e565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610c0a82610a5e565b9150610c1583610a5e565b9250828203905081811115610c2d57610c2c610bd0565b5b92915050565b6000610c3e82610a5e565b9150610c4983610a5e565b9250828202610c5781610a5e565b91508282048414831517610c6e57610c6d610bd0565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610caf82610a5e565b9150610cba83610a5e565b925082610cca57610cc9610c75565b5b828204905092915050565b600082825260208201905092915050565b7f416d6f756e74206d7573742062652067726561746572207468616e20302e0000600082015250565b6000610d1c601e83610cd5565b9150610d2782610ce6565b602082019050919050565b60006020820190508181036000830152610d4b81610d0f565b9050919050565b7f416c7265616479207374616b696e672e20506c6561736520756e7374616b652060008201527f6265666f7265207374616b696e6720616761696e2e0000000000000000000000602082015250565b6000610dae603583610cd5565b9150610db982610d52565b604082019050919050565b60006020820190508181036000830152610ddd81610da1565b9050919050565b6000606082019050610df96000830186610a34565b610e066020830185610a34565b610e136040830184610a68565b949350505050565b610e2481610aff565b8114610e2f57600080fd5b50565b600081519050610e4181610e1b565b92915050565b600060208284031215610e5d57610e5c610a92565b5b6000610e6b84828501610e32565b91505092915050565b6000610e7f82610a5e565b9150610e8a83610a5e565b9250828201905080821115610ea257610ea1610bd0565b5b92915050565b7f4e6f20746f6b656e7320746f20756e7374616b652e0000000000000000000000600082015250565b6000610ede601583610cd5565b9150610ee982610ea8565b602082019050919050565b60006020820190508181036000830152610f0d81610ed1565b9050919050565b6000604082019050610f296000830185610a34565b610f366020830184610a68565b9392505050565b6000604082019050610f526000830185610a68565b610f5f6020830184610a68565b939250505056fea2646970667358221220fcb441a21ae0157608498d5d270ef4ce5fc24fa9b58ac7a4ecbc280af70867e864736f6c63430008180033",
        "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100935760003560e01c8063733bdef011610066578063733bdef01461010e5780637547c7a31461013e5780638da5cb5b1461015a578063a5ce413b14610178578063f2fde38b1461018257610093565b80635298b86914610098578063567e98f9146100b657806364ab8675146100d4578063715018a614610104575b600080fd5b6100a061019e565b6040516100ad9190610a43565b60405180910390f35b6100be6101c8565b6040516100cb9190610a77565b60405180910390f35b6100ee60048036038101906100e99190610ac3565b6101ce565b6040516100fb9190610a77565b60405180910390f35b61010c61029b565b005b61012860048036038101906101239190610ac3565b6102af565b6040516101359190610b5c565b60405180910390f35b61015860048036038101906101539190610ba3565b610337565b005b6101626105b1565b60405161016f9190610a43565b60405180910390f35b6101806105da565b005b61019c60048036038101906101979190610ac3565b610806565b005b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60025481565b600080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1615151515815250509050600081600001514261025e9190610bff565b9050600063bbf81e0060035483856020015161027a9190610c33565b6102849190610c33565b61028e9190610ca4565b9050809350505050919050565b6102a361088c565b6102ad6000610913565b565b6102b76109df565b600460008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060405180606001604052908160008201548152602001600182015481526020016002820160009054906101000a900460ff1615151515815250509050919050565b6000811161037a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161037190610d32565b60405180910390fd5b60001515600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060020160009054906101000a900460ff16151514610410576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040790610dc4565b60405180910390fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b815260040161046f93929190610de4565b6020604051808303816000875af115801561048e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b29190610e47565b50604051806060016040528042815260200182815260200160011515815250600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548160ff02191690831515021790555090505080600260008282546105599190610e74565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167fb539ca1e5c8d398ddf1c41c30166f33404941683be4683319b57669a93dad4ef826040516105a69190610a77565b60405180910390a250565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060020160009054906101000a900460ff1661066e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066590610ef4565b60405180910390fd5b6000610679336101ce565b9050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb338385600101546106ca9190610e74565b6040518363ffffffff1660e01b81526004016106e7929190610f14565b6020604051808303816000875af1158015610706573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061072a9190610e47565b508160010154600260008282546107419190610bff565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f6f2d3e000c89d37446b7c0374c0125068ff316d1e3ee302336478a8cd03c2336836001015483604051610794929190610f3d565b60405180910390a2600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008082016000905560018201600090556002820160006101000a81549060ff021916905550505050565b61080e61088c565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036108805760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016108779190610a43565b60405180910390fd5b61088981610913565b50565b6108946109d7565b73ffffffffffffffffffffffffffffffffffffffff166108b26105b1565b73ffffffffffffffffffffffffffffffffffffffff1614610911576108d56109d7565b6040517f118cdaa70000000000000000000000000000000000000000000000000000000081526004016109089190610a43565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b604051806060016040528060008152602001600081526020016000151581525090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610a2d82610a02565b9050919050565b610a3d81610a22565b82525050565b6000602082019050610a586000830184610a34565b92915050565b6000819050919050565b610a7181610a5e565b82525050565b6000602082019050610a8c6000830184610a68565b92915050565b600080fd5b610aa081610a22565b8114610aab57600080fd5b50565b600081359050610abd81610a97565b92915050565b600060208284031215610ad957610ad8610a92565b5b6000610ae784828501610aae565b91505092915050565b610af981610a5e565b82525050565b60008115159050919050565b610b1481610aff565b82525050565b606082016000820151610b306000850182610af0565b506020820151610b436020850182610af0565b506040820151610b566040850182610b0b565b50505050565b6000606082019050610b716000830184610b1a565b92915050565b610b8081610a5e565b8114610b8b57600080fd5b50565b600081359050610b9d81610b77565b92915050565b600060208284031215610bb957610bb8610a92565b5b6000610bc784828501610b8e565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610c0a82610a5e565b9150610c1583610a5e565b9250828203905081811115610c2d57610c2c610bd0565b5b92915050565b6000610c3e82610a5e565b9150610c4983610a5e565b9250828202610c5781610a5e565b91508282048414831517610c6e57610c6d610bd0565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000610caf82610a5e565b9150610cba83610a5e565b925082610cca57610cc9610c75565b5b828204905092915050565b600082825260208201905092915050565b7f416d6f756e74206d7573742062652067726561746572207468616e20302e0000600082015250565b6000610d1c601e83610cd5565b9150610d2782610ce6565b602082019050919050565b60006020820190508181036000830152610d4b81610d0f565b9050919050565b7f416c7265616479207374616b696e672e20506c6561736520756e7374616b652060008201527f6265666f7265207374616b696e6720616761696e2e0000000000000000000000602082015250565b6000610dae603583610cd5565b9150610db982610d52565b604082019050919050565b60006020820190508181036000830152610ddd81610da1565b9050919050565b6000606082019050610df96000830186610a34565b610e066020830185610a34565b610e136040830184610a68565b949350505050565b610e2481610aff565b8114610e2f57600080fd5b50565b600081519050610e4181610e1b565b92915050565b600060208284031215610e5d57610e5c610a92565b5b6000610e6b84828501610e32565b91505092915050565b6000610e7f82610a5e565b9150610e8a83610a5e565b9250828201905080821115610ea257610ea1610bd0565b5b92915050565b7f4e6f20746f6b656e7320746f20756e7374616b652e0000000000000000000000600082015250565b6000610ede601583610cd5565b9150610ee982610ea8565b602082019050919050565b60006020820190508181036000830152610f0d81610ed1565b9050919050565b6000604082019050610f296000830185610a34565b610f366020830184610a68565b9392505050565b6000604082019050610f526000830185610a68565b610f5f6020830184610a68565b939250505056fea2646970667358221220fcb441a21ae0157608498d5d270ef4ce5fc24fa9b58ac7a4ecbc280af70867e864736f6c63430008180033",
        "linkReferences": {},
        "deployedLinkReferences": {}
    }
]
