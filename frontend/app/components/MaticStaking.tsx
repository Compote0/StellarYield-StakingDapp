'use client';

import React, { useEffect, useState } from "react";
import { Heading, Text, useToast, Button, Input, Box, Flex } from '@chakra-ui/react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { stakingAbi, stakingAddress } from "../constants";
import FaucetStellarToken from "./FaucetStellarToken";

const Staking = () => {
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

  // Staking function
  const handleStaking = async () => {
    if (amount.length > 0) {
      writeContract({
        address: stakingAddress,
        abi: stakingAbi,
        functionName: "stake",
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

  const handleClaim = async () => {
    if (amount.length > 0) {
      writeContract({
        address: stakingAddress,
        abi: stakingAbi,
        functionName: "claim",
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
    <Flex direction="column" gap="5" padding="5" backgroundColor="gray.50" borderRadius="lg" boxShadow="md">
      <Heading as="h3" size="lg" textAlign="center" mb="5">
        Stake MATIC
      </Heading>

      <FaucetStellarToken />

      {/* Staking */}
      <Box backgroundColor="white" p="5" borderRadius="md" boxShadow="base">
        <Text mb="3" fontWeight="bold">Stake Your Tokens</Text>
        <Input
          placeholder="Amount to stake"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
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
      <Box backgroundColor="white" p="5" borderRadius="md" boxShadow="base">
        <Text mb="3" fontWeight="bold">Claim Rewards</Text>
        <Button
          colorScheme="blue"
          onClick={handleClaim}
        >
          Claim
        </Button>
      </Box>

      {/* Withdrawing */}
      <Box backgroundColor="white" p="5" borderRadius="md" boxShadow="base">
        <Text mb="3" fontWeight="bold">Withdraw Tokens</Text>
        <Input
          placeholder="Amount to withdraw"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
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