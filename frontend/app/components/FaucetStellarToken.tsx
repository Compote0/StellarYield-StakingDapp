'use client';

import React, { useEffect, useState } from "react";
import { Heading, Text, useToast, Button, Input, Box, Flex } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stellarTokenAbi, stellarTokenAddress } from "../constants/stellarToken";

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


    const handleFaucet = async () => {
        writeContract({
            address: stellarTokenAddress,
            abi: stellarTokenAbi,
            functionName: 'faucet',
        });
    };

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Faucet successful",
                description: "Tokens successfully claimed!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isSuccess, toast]);


    return (
        <Flex direction="column" gap="5" padding="5" borderRadius="lg" boxShadow="md" backgroundColor="#373c56" borderColor='#828595' borderWidth="1px">
            <Heading as="h3" size="lg" textAlign="center" mb="5" color="#cdced4">
                Get Mumbai Test Tokens</Heading>
            <Button onClick={handleFaucet} isLoading={isPending || isLoading} isDisabled={isPending || isLoading}>
                Get test STELLAR
            </Button>
            <Button as="a" href="https://www.alchemy.com/faucets/polygon-mumbai" target="_blank">Get Test MATIC</Button>

            {isSuccess && <Text color="#D0CEBA">Tokens successfully claimed!</Text>}
        </Flex>
    );
};

export default FaucetStellarToken