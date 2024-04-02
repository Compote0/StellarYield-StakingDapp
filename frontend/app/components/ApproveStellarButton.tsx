'use client';

import React, { useEffect, useState } from "react";
import { useToast, Button, Spinner } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { stellarTokenAbi, stellarTokenAddress } from "../constants/stellarToken";

const ApproveStellarButton = () => {
    const toast = useToast();
    const { address } = useAccount();
    const [isLoading, setIsLoading] = useState(false);


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
                setIsLoading(false);
            },
            onError: (error) => {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setIsLoading(false);
            },
        },
    });

    useWaitForTransactionReceipt({
        hash,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false),
    });



    const {
        data: balance,
    } = useReadContract({
        address: stellarTokenAddress,
        abi: stellarTokenAbi,
        functionName: "balanceOf",
        account: address,
    });

    const handleApprove = async () => {
        if (balance === undefined) {
            toast({
                title: 'Error',
                description: "Your balance is not loaded yet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setIsLoading(false);
            return;
        }

        const balanceBigInt = BigInt(balance.toString());

        setIsLoading(true);
        writeContract({
            address: stellarTokenAddress,
            abi: stellarTokenAbi,
            functionName: 'approve',
            args: ["0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", balanceBigInt],
        });
    };


    return (
        <Button
            colorScheme="green"
            variant="outline"
            mt="3"
            gap="2"
            p="1rem"
            onClick={handleApprove}
            isLoading={isLoading}
            loadingText="Processing..."
            spinner={<Spinner size="sm" />}
        >
            Approve Transfer
        </Button>
    );
};

export default ApproveStellarButton