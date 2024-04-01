'use client';

import React, { useEffect, useState } from "react";
import { Heading, Text, useToast, Button, Input, Box, Flex } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingAbi, stakingAddress } from "../constants";
import { parseEther } from "viem";

const Staking = () => {
    const toast = useToast();
    const [amount, setAmount] = useState('');

    const [depositValue, setDepositValue] = useState('');

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

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    // Staking function
    const handleStaking = async () => {
        if (!isNaN(depositValue)) {
            writeContract({
                address: stakingAddress,
                abi: stakingAbi,
                functionName: "stake",
                value: parseEther(depositValue),
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

    const handleClaim = async () => {
        if (amount.length > 0) {
            writeContract({
                address: stakingAddress,
                abi: stakingAbi,
                functionName: "claim",
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

    const handleWithdraw = async () => {
        if (amount.length > 0) {
            writeContract({
                address: stakingAddress,
                abi: stakingAbi,
                functionName: "withdraw",
                args: [amount],
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
    return (
        <Flex id='stakeStellar' height="100vh" direction="column" gap="5" padding="5" backgroundColor="#06122C" borderRadius="lg" boxShadow="md" alignItems="center" justifyContent="center">
            <Heading as="h3" size="lg" textAlign="center" mb="5" color='#cdced4'>
                Stake STELLAR
            </Heading>

            {/* Staking */}
            <Box width={{ base: "80%", md: "30%" }} p="5" borderRadius="md" boxShadow="base" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px">
                <Text mb="3" fontWeight="bold" color='#cdced4'>Stake Your Tokens</Text>
                <Input
                    placeholder="Amount to stake"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    color='#cdced4'
                />
                <Button
                    colorScheme="teal"
                    mt="3"
                    onClick={handleStaking}
                >
                    Stake
                </Button>
            </Box>

            {/* Claiming */}
            <Box width={{ base: "80%", md: "30%" }} p="5" borderRadius="md" boxShadow="base" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px">
                <Text mb="3" fontWeight="bold" color='#cdced4'>Claim Rewards</Text>
                <Button
                    colorScheme="blue"
                    onClick={handleClaim}
                >
                    Claim
                </Button>
            </Box>

            {/* Withdrawing */}
            <Box width={{ base: "80%", md: "30%" }} p="5" borderRadius="md" boxShadow="base" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px">
                <Text mb="3" fontWeight="bold" color='#cdced4'>Withdraw Tokens</Text>
                <Input
                    placeholder="Amount to withdraw"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    color='#cdced4'
                />
                <Button
                    colorScheme="red"
                    mt="3"
                    onClick={handleWithdraw}
                >
                    Withdraw
                </Button>
            </Box>
        </Flex>
    );
};

export default Staking