import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking Tests", function () {
  // Fixture : function to deploy the staking contract before each test
  async function deployStakingContract() {
      // Get signers from ethers, representing different accounts
      const [owner, addr1, addr2, addr3] = await ethers.getSigners();

      // Deploy the staking contract
      const Staking = await (ethers as any).getContractFactory("Staking");
      const staking = await Staking.deploy();
      await staking.waitForDeployment();

      // Return deployed contract and signers for use in tests
      return { staking, owner, addr1, addr2, addr3 };
    }
    
    // Group tests related to contract deployment
    describe("Deployment", function () {
        // Test for successful contract deployment
        it("should deploy the contract", async function () {
            const { staking, owner } = await loadFixture(deployStakingContract);

            let theOwner = await staking.owner();

            // Assert that the contract owner is the expected owner
            assert.equal(owner.address, theOwner);
        });
        // Test to verify the correct owner is set upon deployment
        it("Should set the right owner", async function () {
            const { staking, owner } = await loadFixture(deployStakingContract);

            // Expect the owner returned by the contract to be equal to the expected owner
            expect(await staking.owner()).to.equal(owner.address);
        });
    });

    // Group tests related to staking functionality
    describe("Staking", function () {
        // Test for returning the total staked balance
        it("should return total staked balance", async function () {
          const { staking, addr1, addr2 } = await loadFixture(deployStakingContract);

          // Define stake amounts for two addresses
          const stakeAmountAddr1 = ethers.parseEther("1");
          const stakeAmountAddr2 = ethers.parseEther("2");

          // Stake amounts for both addresses
          await staking.connect(addr1).stake({ value: stakeAmountAddr1 });
          await staking.connect(addr2).stake({ value: stakeAmountAddr2 });

          // Calculate total staked balance
          const totalStake = stakeAmountAddr1.valueOf() + stakeAmountAddr2.valueOf();

          // Expect the total staked balance to match the calculated total
          expect(await staking.getTotalStakedBalance()).to.equal(totalStake);
        });
        // Test for returning a user's balance
        it("should return user balance", async function () {
          const { staking, addr1 } = await loadFixture(deployStakingContract);

          // Define a stake amount
          const stakeAmount = ethers.parseEther("1");
          // Stake the amount
          await staking.connect(addr1).stake({ value: stakeAmount });
          // Expect the user balance to match the staked amount
          expect(await staking.getUserBalance(addr1.address)).to.equal(stakeAmount);
        });      
        // Test to ensure staking 0 value is reverted
        it("should revert stake because amount cannot be 0", async function () {
          const { staking, addr1 } = await loadFixture(deployStakingContract);

        // Expect the stake function to revert if the staked amount is 0
          await expect(staking.connect(addr1).stake({ value: 0 })).to.be.revertedWith("Staking amount must be more than zero");
        });
        // Test staking functionality
        it("should stake tokens", async function () {
          const { staking, addr1 } = await loadFixture(deployStakingContract);
          const stakeAmount = ethers.parseEther("1");
          // Stake the amount of tokens
          await staking.connect(addr1).stake({ value: stakeAmount });
          // Expect the total staked balance and user balance to match the staked amount
          expect(await staking.getTotalStakedBalance()).to.equal(stakeAmount);
          expect(await staking.getUserBalance(addr1.address)).to.equal(stakeAmount);
        });
        // Test minting sMATIC upon staking
        it("should mint sMATIC when stake 1:1 tokens", async function () {
          const { staking, addr1 } = await loadFixture(deployStakingContract);

          const stakeAmount = ethers.parseEther("1");
          await staking.connect(addr1).stake({ value: stakeAmount });
          // Expect the balance of sMATIC tokens for the staker to match the staked amount
          expect(await staking.balanceOf(addr1.address)).to.equal(stakeAmount);
        });
        // Test for emitting a Staked event with the correct arguments including 
        it("should emit Staked successfully with timestamp", async function () {
          const { staking, addr1 } = await loadFixture(deployStakingContract);

          const stakeAmount = ethers.parseEther("1");
          // Perform the staking transaction
          const tx = await staking.connect(addr1).stake({ value: stakeAmount });
          // Wait for the transaction to be mined   
          await tx.wait();

          // Retrieve the block in which the transaction was mined to get its timestamp
          const block = await ethers.provider.getBlock(tx.blockNumber);
          
          // Expect the Staked event to be emitted with the correct address, amount, and the block timestamp
          await expect(tx)
              .to.emit(staking, "Staked")
              .withArgs(addr1.address, stakeAmount, (block as any).timestamp);
        });             
    });
});