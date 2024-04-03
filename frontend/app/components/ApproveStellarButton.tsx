import React, { useEffect, useState } from "react";
import { useToast, Button, Spinner } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from 'wagmi';
import { stellarTokenAbi, stellarTokenAddress } from "../constants/stellarToken";
import { useGlobalContext } from "../context/app-context";

const ApproveStellarButton = () => {
    const toast = useToast();
    const { address } = useAccount();
    const [isApproveLoading, setIsApproveLoading] = useState(false);
    const { approveToken } = useGlobalContext();

    const {
        data: hash,
        error,
        isPending,
        writeContract,
    } = useWriteContract({
        mutation: {
            onSuccess: () => {
                toast({
                    title: 'Approve pending...',
                    description: "Your approval is being registered.",
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });
                setIsApproveLoading(false);
            },
            onError: (error) => {
                toast({
                    title: error.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setIsApproveLoading(false);
            },
        },
    });

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const {
        data: balance,
    } = useReadContract({
        address: stellarTokenAddress,
        abi: stellarTokenAbi,
        functionName: "balanceOf",
        args: [address],
    });

    const handleApprove = async () => {
        if (balance === undefined || balance === null) {
            toast({
                title: 'Error',
                description: "Your balance is not loaded yet.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setIsApproveLoading(false);
            return;
        }

        const balanceBigInt = BigInt(balance.toString());

        setIsApproveLoading(true);
        writeContract({
            address: stellarTokenAddress,
            abi: stellarTokenAbi,
            functionName: 'approve',
            args: ["0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", balanceBigInt],
        });
    };

    useEffect(() => {
        if (isSuccess) {
            approveToken(true);
            toast({
                title: "Approval successful",
                description: "Approved successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isSuccess, toast, approveToken]);


    return (
        <Button
            colorScheme="green"
            variant="outline"
            mt="3"
            gap="2"
            p="1rem"
            onClick={handleApprove}
            isLoading={isApproveLoading}
            loadingText="Processing..."
            spinner={<Spinner size="sm" />}
        >
            Approve Transfer
        </Button>
    );
};

export default ApproveStellarButton;

