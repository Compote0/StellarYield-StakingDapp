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
        "bytecode": "0x60806040523480156200001157600080fd5b50336040518060400160405280601381526020017f5374656c6c6172205969656c6420546f6b656e000000000000000000000000008152506040518060400160405280600781526020017f5354454c4c4152000000000000000000000000000000000000000000000000008152508160039081620000909190620007c0565b508060049081620000a29190620007c0565b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200011a5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401620001119190620008ec565b60405180910390fd5b6200012b81620001c060201b60201c565b50600160068190555062000150678505b443f081566160c01b6200028660201b60201c565b6200016c670a1e20188e0db86260c01b6200028660201b60201c565b6200018867742182bbdeb11c1c60c01b6200028660201b60201c565b620001ba336012600a6200019d919062000a99565b633b9aca00620001ae919062000aea565b6200028960201b60201c565b62000bdb565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002fe5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401620002f59190620008ec565b60405180910390fd5b62000312600083836200031660201b60201c565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200036c5780600260008282546200035f919062000b35565b9250508190555062000442565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015620003fb578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401620003f29392919062000b81565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036200048d5780600260008282540392505081905550620004da565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405162000539919062000bbe565b60405180910390a3505050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620005c857607f821691505b602082108103620005de57620005dd62000580565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620006487fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000609565b62000654868362000609565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b6000620006a16200069b62000695846200066c565b62000676565b6200066c565b9050919050565b6000819050919050565b620006bd8362000680565b620006d5620006cc82620006a8565b84845462000616565b825550505050565b600090565b620006ec620006dd565b620006f9818484620006b2565b505050565b5b81811015620007215762000715600082620006e2565b600181019050620006ff565b5050565b601f82111562000770576200073a81620005e4565b6200074584620005f9565b8101602085101562000755578190505b6200076d6200076485620005f9565b830182620006fe565b50505b505050565b600082821c905092915050565b6000620007956000198460080262000775565b1980831691505092915050565b6000620007b0838362000782565b9150826002028217905092915050565b620007cb8262000546565b67ffffffffffffffff811115620007e757620007e662000551565b5b620007f38254620005af565b6200080082828562000725565b600060209050601f83116001811462000838576000841562000823578287015190505b6200082f8582620007a2565b8655506200089f565b601f1984166200084886620005e4565b60005b8281101562000872578489015182556001820191506020850194506020810190506200084b565b868310156200089257848901516200088e601f89168262000782565b8355505b6001600288020188555050505b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620008d482620008a7565b9050919050565b620008e681620008c7565b82525050565b6000602082019050620009036000830184620008db565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111562000997578086048111156200096f576200096e62000909565b5b60018516156200097f5780820291505b80810290506200098f8562000938565b94506200094f565b94509492505050565b600082620009b2576001905062000a85565b81620009c2576000905062000a85565b8160018114620009db5760028114620009e65762000a1c565b600191505062000a85565b60ff841115620009fb57620009fa62000909565b5b8360020a91508482111562000a155762000a1462000909565b5b5062000a85565b5060208310610133831016604e8410600b841016171562000a565782820a90508381111562000a505762000a4f62000909565b5b62000a85565b62000a65848484600162000945565b9250905081840481111562000a7f5762000a7e62000909565b5b81810290505b9392505050565b600060ff82169050919050565b600062000aa6826200066c565b915062000ab38362000a8c565b925062000ae27fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484620009a0565b905092915050565b600062000af7826200066c565b915062000b04836200066c565b925082820262000b14816200066c565b9150828204841483151762000b2e5762000b2d62000909565b5b5092915050565b600062000b42826200066c565b915062000b4f836200066c565b925082820190508082111562000b6a5762000b6962000909565b5b92915050565b62000b7b816200066c565b82525050565b600060608201905062000b986000830186620008db565b62000ba7602083018562000b70565b62000bb6604083018462000b70565b949350505050565b600060208201905062000bd5600083018462000b70565b92915050565b6113968062000beb6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063715018a61161008c578063a9059cbb11610066578063a9059cbb14610204578063dd62ed3e14610234578063de5f72fd14610264578063f2fde38b1461026e576100cf565b8063715018a6146101be5780638da5cb5b146101c857806395d89b41146101e6576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce5671461017057806370a082311461018e575b600080fd5b6100dc61028a565b6040516100e99190610e2a565b60405180910390f35b61010c60048036038101906101079190610ee5565b61031c565b6040516101199190610f40565b60405180910390f35b61012a61033f565b6040516101379190610f6a565b60405180910390f35b61015a60048036038101906101559190610f85565b610349565b6040516101679190610f40565b60405180910390f35b610178610378565b6040516101859190610ff4565b60405180910390f35b6101a860048036038101906101a3919061100f565b610381565b6040516101b59190610f6a565b60405180910390f35b6101c66103c9565b005b6101d06103dd565b6040516101dd919061104b565b60405180910390f35b6101ee610407565b6040516101fb9190610e2a565b60405180910390f35b61021e60048036038101906102199190610ee5565b610499565b60405161022b9190610f40565b60405180910390f35b61024e60048036038101906102499190611066565b6104bc565b60405161025b9190610f6a565b60405180910390f35b61026c610543565b005b6102886004803603810190610283919061100f565b6105a4565b005b606060038054610299906110d5565b80601f01602080910402602001604051908101604052809291908181526020018280546102c5906110d5565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b60008061032761062a565b9050610334818585610632565b600191505092915050565b6000600254905090565b60008061035461062a565b9050610361858285610644565b61036c8585856106d8565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6103d16107cc565b6103db6000610853565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060048054610416906110d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610442906110d5565b801561048f5780601f106104645761010080835404028352916020019161048f565b820191906000526020600020905b81548152906001019060200180831161047257829003601f168201915b5050505050905090565b6000806104a461062a565b90506104b18185856106d8565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6105576733b52962a9abcebd60c01b610919565b61056b67b22e20d72b4c768a60c01b610919565b61057f67dc6c3508c1a4b4e060c01b610919565b6105a2336012600a6105919190611268565b600a61059d91906112b3565b61091c565b565b6105ac6107cc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361061e5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610615919061104b565b60405180910390fd5b61062781610853565b50565b600033905090565b61063f838383600161099e565b505050565b600061065084846104bc565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146106d257818110156106c2578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016106b9939291906112f5565b60405180910390fd5b6106d18484848403600061099e565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361074a5760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610741919061104b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107bc5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107b3919061104b565b60405180910390fd5b6107c7838383610b75565b505050565b6107d461062a565b73ffffffffffffffffffffffffffffffffffffffff166107f26103dd565b73ffffffffffffffffffffffffffffffffffffffff16146108515761081561062a565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610848919061104b565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361098e5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610985919061104b565b60405180910390fd5b61099a60008383610b75565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610a105760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610a07919061104b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a825760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a79919061104b565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610b6f578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b669190610f6a565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610bc7578060026000828254610bbb919061132c565b92505081905550610c9a565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c53578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c4a939291906112f5565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ce35780600260008282540392505081905550610d30565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d8d9190610f6a565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610dd4578082015181840152602081019050610db9565b60008484015250505050565b6000601f19601f8301169050919050565b6000610dfc82610d9a565b610e068185610da5565b9350610e16818560208601610db6565b610e1f81610de0565b840191505092915050565b60006020820190508181036000830152610e448184610df1565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e7c82610e51565b9050919050565b610e8c81610e71565b8114610e9757600080fd5b50565b600081359050610ea981610e83565b92915050565b6000819050919050565b610ec281610eaf565b8114610ecd57600080fd5b50565b600081359050610edf81610eb9565b92915050565b60008060408385031215610efc57610efb610e4c565b5b6000610f0a85828601610e9a565b9250506020610f1b85828601610ed0565b9150509250929050565b60008115159050919050565b610f3a81610f25565b82525050565b6000602082019050610f556000830184610f31565b92915050565b610f6481610eaf565b82525050565b6000602082019050610f7f6000830184610f5b565b92915050565b600080600060608486031215610f9e57610f9d610e4c565b5b6000610fac86828701610e9a565b9350506020610fbd86828701610e9a565b9250506040610fce86828701610ed0565b9150509250925092565b600060ff82169050919050565b610fee81610fd8565b82525050565b60006020820190506110096000830184610fe5565b92915050565b60006020828403121561102557611024610e4c565b5b600061103384828501610e9a565b91505092915050565b61104581610e71565b82525050565b6000602082019050611060600083018461103c565b92915050565b6000806040838503121561107d5761107c610e4c565b5b600061108b85828601610e9a565b925050602061109c85828601610e9a565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110ed57607f821691505b602082108103611100576110ff6110a6565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111561118c5780860481111561116857611167611106565b5b60018516156111775780820291505b808102905061118585611135565b945061114c565b94509492505050565b6000826111a55760019050611261565b816111b35760009050611261565b81600181146111c957600281146111d357611202565b6001915050611261565b60ff8411156111e5576111e4611106565b5b8360020a9150848211156111fc576111fb611106565b5b50611261565b5060208310610133831016604e8410600b84101617156112375782820a90508381111561123257611231611106565b5b611261565b6112448484846001611142565b9250905081840481111561125b5761125a611106565b5b81810290505b9392505050565b600061127382610eaf565b915061127e83610fd8565b92506112ab7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611195565b905092915050565b60006112be82610eaf565b91506112c983610eaf565b92508282026112d781610eaf565b915082820484148315176112ee576112ed611106565b5b5092915050565b600060608201905061130a600083018661103c565b6113176020830185610f5b565b6113246040830184610f5b565b949350505050565b600061133782610eaf565b915061134283610eaf565b925082820190508082111561135a57611359611106565b5b9291505056fea26469706673582212200115492bc6720ff5447537bb32a8eb853910ac660bf86ce9cd4b60f43b86485364736f6c63430008180033",
        "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100cf5760003560e01c8063715018a61161008c578063a9059cbb11610066578063a9059cbb14610204578063dd62ed3e14610234578063de5f72fd14610264578063f2fde38b1461026e576100cf565b8063715018a6146101be5780638da5cb5b146101c857806395d89b41146101e6576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce5671461017057806370a082311461018e575b600080fd5b6100dc61028a565b6040516100e99190610e2a565b60405180910390f35b61010c60048036038101906101079190610ee5565b61031c565b6040516101199190610f40565b60405180910390f35b61012a61033f565b6040516101379190610f6a565b60405180910390f35b61015a60048036038101906101559190610f85565b610349565b6040516101679190610f40565b60405180910390f35b610178610378565b6040516101859190610ff4565b60405180910390f35b6101a860048036038101906101a3919061100f565b610381565b6040516101b59190610f6a565b60405180910390f35b6101c66103c9565b005b6101d06103dd565b6040516101dd919061104b565b60405180910390f35b6101ee610407565b6040516101fb9190610e2a565b60405180910390f35b61021e60048036038101906102199190610ee5565b610499565b60405161022b9190610f40565b60405180910390f35b61024e60048036038101906102499190611066565b6104bc565b60405161025b9190610f6a565b60405180910390f35b61026c610543565b005b6102886004803603810190610283919061100f565b6105a4565b005b606060038054610299906110d5565b80601f01602080910402602001604051908101604052809291908181526020018280546102c5906110d5565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b60008061032761062a565b9050610334818585610632565b600191505092915050565b6000600254905090565b60008061035461062a565b9050610361858285610644565b61036c8585856106d8565b60019150509392505050565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6103d16107cc565b6103db6000610853565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060048054610416906110d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610442906110d5565b801561048f5780601f106104645761010080835404028352916020019161048f565b820191906000526020600020905b81548152906001019060200180831161047257829003601f168201915b5050505050905090565b6000806104a461062a565b90506104b18185856106d8565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6105576733b52962a9abcebd60c01b610919565b61056b67b22e20d72b4c768a60c01b610919565b61057f67dc6c3508c1a4b4e060c01b610919565b6105a2336012600a6105919190611268565b600a61059d91906112b3565b61091c565b565b6105ac6107cc565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff160361061e5760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610615919061104b565b60405180910390fd5b61062781610853565b50565b600033905090565b61063f838383600161099e565b505050565b600061065084846104bc565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146106d257818110156106c2578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016106b9939291906112f5565b60405180910390fd5b6106d18484848403600061099e565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361074a5760006040517f96c6fd1e000000000000000000000000000000000000000000000000000000008152600401610741919061104b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107bc5760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107b3919061104b565b60405180910390fd5b6107c7838383610b75565b505050565b6107d461062a565b73ffffffffffffffffffffffffffffffffffffffff166107f26103dd565b73ffffffffffffffffffffffffffffffffffffffff16146108515761081561062a565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610848919061104b565b60405180910390fd5b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b50565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361098e5760006040517fec442f05000000000000000000000000000000000000000000000000000000008152600401610985919061104b565b60405180910390fd5b61099a60008383610b75565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610a105760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610a07919061104b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610a825760006040517f94280d62000000000000000000000000000000000000000000000000000000008152600401610a79919061104b565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610b6f578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610b669190610f6a565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610bc7578060026000828254610bbb919061132c565b92505081905550610c9a565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c53578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610c4a939291906112f5565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ce35780600260008282540392505081905550610d30565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610d8d9190610f6a565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610dd4578082015181840152602081019050610db9565b60008484015250505050565b6000601f19601f8301169050919050565b6000610dfc82610d9a565b610e068185610da5565b9350610e16818560208601610db6565b610e1f81610de0565b840191505092915050565b60006020820190508181036000830152610e448184610df1565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e7c82610e51565b9050919050565b610e8c81610e71565b8114610e9757600080fd5b50565b600081359050610ea981610e83565b92915050565b6000819050919050565b610ec281610eaf565b8114610ecd57600080fd5b50565b600081359050610edf81610eb9565b92915050565b60008060408385031215610efc57610efb610e4c565b5b6000610f0a85828601610e9a565b9250506020610f1b85828601610ed0565b9150509250929050565b60008115159050919050565b610f3a81610f25565b82525050565b6000602082019050610f556000830184610f31565b92915050565b610f6481610eaf565b82525050565b6000602082019050610f7f6000830184610f5b565b92915050565b600080600060608486031215610f9e57610f9d610e4c565b5b6000610fac86828701610e9a565b9350506020610fbd86828701610e9a565b9250506040610fce86828701610ed0565b9150509250925092565b600060ff82169050919050565b610fee81610fd8565b82525050565b60006020820190506110096000830184610fe5565b92915050565b60006020828403121561102557611024610e4c565b5b600061103384828501610e9a565b91505092915050565b61104581610e71565b82525050565b6000602082019050611060600083018461103c565b92915050565b6000806040838503121561107d5761107c610e4c565b5b600061108b85828601610e9a565b925050602061109c85828601610e9a565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806110ed57607f821691505b602082108103611100576110ff6110a6565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60008160011c9050919050565b6000808291508390505b600185111561118c5780860481111561116857611167611106565b5b60018516156111775780820291505b808102905061118585611135565b945061114c565b94509492505050565b6000826111a55760019050611261565b816111b35760009050611261565b81600181146111c957600281146111d357611202565b6001915050611261565b60ff8411156111e5576111e4611106565b5b8360020a9150848211156111fc576111fb611106565b5b50611261565b5060208310610133831016604e8410600b84101617156112375782820a90508381111561123257611231611106565b5b611261565b6112448484846001611142565b9250905081840481111561125b5761125a611106565b5b81810290505b9392505050565b600061127382610eaf565b915061127e83610fd8565b92506112ab7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484611195565b905092915050565b60006112be82610eaf565b91506112c983610eaf565b92508282026112d781610eaf565b915082820484148315176112ee576112ed611106565b5b5092915050565b600060608201905061130a600083018661103c565b6113176020830185610f5b565b6113246040830184610f5b565b949350505050565b600061133782610eaf565b915061134283610eaf565b925082820190508082111561135a57611359611106565b5b9291505056fea26469706673582212200115492bc6720ff5447537bb32a8eb853910ac660bf86ce9cd4b60f43b86485364736f6c63430008180033",
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
