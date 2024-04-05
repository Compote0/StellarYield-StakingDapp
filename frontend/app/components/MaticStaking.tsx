'use client';

import React, { useEffect, useState } from "react";
import { Heading, Text, useToast, Button, Input, Box, Flex } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingMaticAbi, stakingMaticAddress } from "../constants/stakingMatic";
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
    const numericDepositValue = parseFloat(depositValue);
    if (!isNaN(numericDepositValue)) {
      writeContract({
        address: stakingMaticAddress,
        abi: stakingMaticAbi,
        functionName: "stake",
        value: parseEther(depositValue),
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
    if (amount.length > 0) {
      writeContract({
        address: stakingMaticAddress,
        abi: stakingMaticAbi,
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
        address: stakingMaticAddress,
        abi: stakingMaticAbi,
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
    <Flex
      id='stakeMatic'
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#06122C"
    >
      <Text fontSize="5xl" color="white">
        Stake MATIC - Coming Soon
      </Text>
    </Flex >
  );
};

export default Staking