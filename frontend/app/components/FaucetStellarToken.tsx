'use client';

import React, { useEffect, useState } from "react";
import { Heading, Text, useToast, Button, Input, Box, Flex } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stellarTokenAbi, stellarTokenAddress } from "../constants";

const FaucetStellarToken = () => {
    const toast = useToast();
    const [amount, setAmount] = useState('');

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

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Faucet is being registered',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isSuccess]);

    const handleFaucet = async () => {
        if (amount.length > 0) {
            writeContract({
                address: stellarTokenAddress,
                abi: stellarTokenAbi,
                functionName: "faucet",
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
        <Flex direction="column" gap="5" padding="5" backgroundColor="gray.50" borderRadius="lg" boxShadow="md">
            <Heading as="h3" size="lg" textAlign="center" mb="5">
                Stellar Token Faucet</Heading>
            <Text>Enter the amount of tokens you want to receive:</Text>
            <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button onClick={handleFaucet} isLoading={isPending || isLoading} isDisabled={isPending || isLoading}>
                Get Tokens
            </Button>
            {isSuccess && <Text color="green.500">Tokens successfully claimed!</Text>}
            {error && <Text color="red.500">{error.message}</Text>}
        </Flex>
    );
};

export default FaucetStellarToken