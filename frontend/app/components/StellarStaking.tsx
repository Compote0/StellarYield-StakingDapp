import React, { useEffect, useState } from "react";
import { Heading, Text, useToast, Button, Input, Box, Flex, Badge } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from 'wagmi';
import { stakingStellarAbi, stakingStellarAddress } from "../constants/stakingStellar";
import { parseEther } from "viem";
import ApproveStellarButton from "./ApproveStellarButton";
import Events from "./Events";
import { useGlobalContext } from "../context/app-context";

const StellarStaking = () => {
    const toast = useToast();
    const [amount, setAmount] = useState('');
    const [depositValue, setDepositValue] = useState('');
    const { isApproved, getEvents, fetchUserDetails, userDetails, userBalance, fetchUserBalance } = useGlobalContext();

    const {
        data: hash,
        error,
        isPending,
        writeContract,
    } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: 'Transaction pending...',
                    description: "Your transaction is being registered.",
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
            },
            onError: (error) => {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            },
        },
    });

    const handleStaking = async () => {
        const depositValueNumeric = parseFloat(depositValue);
        if (!isNaN(depositValueNumeric) && depositValueNumeric > 0) {
            writeContract({
                address: stakingStellarAddress,
                abi: stakingStellarAbi,
                functionName: "stake",
                args: [parseEther(depositValue).toString()],
            });
        } else {
            toast({
                title: 'Please enter a valid amount',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleClaim = async () => {
        writeContract({
            address: stakingStellarAddress,
            abi: stakingStellarAbi,
            functionName: "getReward",
        });
    };

    const handleWithdraw = async () => {
        if (amount.length > 0) {
            writeContract({
                address: stakingStellarAddress,
                abi: stakingStellarAbi,
                functionName: "withdraw",
                args: [parseEther(amount).toString()],
            });
        } else {
            toast({
                title: 'Please enter an amount',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })


    useEffect(() => {
        getEvents();
        fetchUserDetails();
        fetchUserBalance();
        if (isConfirmed) {
            toast({
                title: 'Transaction successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isConfirmed]);

    return (
        <Flex id='stakeStellar' height="100vh" direction="column" gap="5" padding="5" backgroundColor="#06122C" borderRadius="lg" boxShadow="md" alignItems="center" justifyContent="center">
            <Heading as="h3" size="lg" textAlign="center" mb="5" color='#cdced4'>
                Stake STELLAR
            </Heading>

            {/* Staking */}
            <Box width={{ base: "80%", md: "30%" }} p="5" borderRadius="md" boxShadow="base" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px" gap="5">
                <Text mb="2" fontWeight="bold" color='#cdced4'>Stake Your Tokens - Locked 9 days</Text>
                <Text fontSize="sm" color="gray.500" mb="1">Your wallet balance: {userBalance} STELLAR</Text>
                <Input
                    placeholder="Amount to stake"
                    onChange={(e) => setDepositValue(e.target.value)}
                    type="number"
                    color='#cdced4'
                />

                <Box gap={2}>
                    {!isApproved && <ApproveStellarButton />}

                    <Button
                        colorScheme="blue"
                        variant='solid'
                        mt="3"
                        onClick={handleStaking}
                        isDisabled={!isApproved}
                    >
                        Stake
                    </Button>
                </Box>
            </Box>

            {/* Claiming */}
            <Box width={{ base: "80%", md: "30%" }} p="5" borderRadius="md" boxShadow="base" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px">
                <Text mb="2" fontWeight="bold" color='#cdced4'>Claim Rewards</Text>
                {userDetails && (
                    <Text fontSize="sm" color="gray.500" mb="1">
                        Your pending rewards: {userDetails.pendingRewards.toFixed(3)} STELLAR
                    </Text>
                )}
                <Button
                    colorScheme="blue"
                    onClick={handleClaim}
                    variant='solid'
                >
                    Claim
                </Button>
            </Box>

            {/* Withdrawing */}
            <Box width={{ base: "80%", md: "30%" }} p="5" borderRadius="md" boxShadow="base" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px">
                <Text mb="2" fontWeight="bold" color='#cdced4'>Withdraw Tokens</Text>
                {userDetails && userDetails.stakedAmount > 0 && (
                    <Flex direction="column" gap="2">
                        <Flex gap="2" align="center">
                            <Text fontSize="sm" color="gray.500">Unlock Time:</Text>
                            <Badge colorScheme="purple" p="1">
                                {new Date(userDetails.unlockTime * 1000).toLocaleString()}
                            </Badge>
                        </Flex>
                        <Text fontSize="sm" color="gray.500" mb="1">
                            Your staked STELLAR: {userDetails.stakedAmount}
                        </Text>
                    </Flex>
                )}

                <Input
                    placeholder="Amount to withdraw"
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    color='#cdced4'
                />
                <Button
                    colorScheme="blue"
                    variant='solid'
                    mt="3"
                    onClick={handleWithdraw}
                >
                    Withdraw
                </Button>
            </Box>
            <Events />
        </Flex >
    );
};

export default StellarStaking