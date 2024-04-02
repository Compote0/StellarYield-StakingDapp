import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe.skip("Staking Tests", function () {
  // Fixture : function to deploy the contracts before each test
  async function deployStellarTokenContract() {
    const StellarToken = await (ethers as any).getContractFactory("StellarToken");
    const stellarToken = await StellarToken.deploy();
    await stellarToken.waitForDeployment();

    return stellarToken;
  }

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

  // Group tests related to get balances
  describe("Balances", function () {
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
  });

  // Group tests related to staking functionality
  describe("Staking", function () {
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

  describe("Unstaking", function () {
    // Test to ensure withdraw reverts if the withdraw amount exceeds the staked amount
    it("should revert withdraw because amount cannot be greater than the staked amount", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      const extraAmount = ethers.parseEther("2");
      await staking.connect(addr1).stake({ value: stakeAmount });

      // Attempt to withdraw more than the staked amount
      await expect(staking.connect(addr1).withdraw(stakeAmount + extraAmount))
        .to.be.revertedWith("Cannot withdraw more than the staked amount");
    });
    // Test to ensure tokens can be unstaked successfully
    it("should unstake tokens", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [9 * 24 * 60 * 60 + 1]); // 9 days + 1 second
      await ethers.provider.send('evm_mine', []);
      // Unstake the same amount as staked
      await expect(staking.connect(addr1).withdraw(stakeAmount))
        .to.not.be.reverted;
      expect(await staking.getUserBalance(addr1.address)).to.equal(0);
    });
    // Test to ensure sMATIC tokens are burned upon withdrawal
    it("should burn sMATIC when user withdraw MATIC", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [9 * 24 * 60 * 60 + 1]); // 9 days + 1 second
      await ethers.provider.send('evm_mine', []);

      await staking.connect(addr1).withdraw(stakeAmount);

      // The sMATIC balance of the user should be zero after withdrawal
      expect(await staking.balanceOf(addr1.address)).to.equal(0);
    });
    // Test to ensure the Withdrawn event is emitted with correct arguments, including a timestamp
    it("should emit Withdrawn event with timestamp", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [9 * 24 * 60 * 60 + 1]); // 9 days + 1 second
      await ethers.provider.send('evm_mine', []);

      const tx = await staking.connect(addr1).withdraw(stakeAmount);

      await tx.wait();
      const block = await ethers.provider.getBlock(tx.blockNumber);

      // Expect the Withdrawn event to be emitted with the correct address, amount, and block timestamp
      await expect(tx)
        .to.emit(staking, "Withdrawn")
        .withArgs(addr1.address, stakeAmount, (block as any).timestamp);
    });
  });

  describe("Claim", function () {
    it("should revert because there's no staked MATIC to claim rewards from", async function () {
      const { staking, addr1, addr2 } = await loadFixture(deployStakingContract);
      await expect(staking.connect(addr1).claim()).to.be.revertedWith("No staked MATIC to claim rewards from");
    });
    it("should revert because can only claim once a week", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await expect(staking.connect(addr1).claim())
        .to.be.revertedWith("Rewards can only be claimed once a week");

      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
      await ethers.provider.send("evm_mine", []);

      await expect(staking.connect(addr1).claim()).not.to.be.reverted
    });
    it("should claim successfully with correct calculated rewards", async function () {
      const { staking, addr1, addr2 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
      await ethers.provider.send('evm_mine', []);

      const balanceBefore = await staking.balanceOf(addr1.address);

      await staking.connect(addr1).claim();

      const balanceAfter = await staking.balanceOf(addr1.address);

      expect(balanceAfter).to.be.gt(balanceBefore);

    });
    it("should emit claimed with correct values", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);
      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [9 * 24 * 60 * 60 + 1]);
      await ethers.provider.send('evm_mine', []);

      await expect(staking.connect(addr1).claim())
        .to.emit(staking, 'Claimed')
    });
    it("should update lastClaimTime successfully after a claim", async function () {
      const { staking, addr1, addr2 } = await loadFixture(deployStakingContract);

      const stakeAmount = ethers.parseEther("1");

      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
      await ethers.provider.send('evm_mine', []);

      const currentTime = (await ethers.provider.getBlock('latest') as any).timestamp;
      await staking.connect(addr1).claim();

      const lastClaimTime = await staking.lastClaimTime(addr1.address);

      expect(lastClaimTime).to.be.at.least(currentTime);
      expect(lastClaimTime).to.be.below(currentTime + 2);

    });
    it("should send Stellar as rewards", async function () {
      const stellarToken = await loadFixture(deployStellarTokenContract);
      const { staking, addr1 } = await loadFixture(deployStakingContract);

      const stakeAmount = ethers.parseEther("1");
      await staking.connect(addr1).stake({ value: stakeAmount });

      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60 + 1]);
      await ethers.provider.send("evm_mine", []);

      const balanceBefore = await stellarToken.balanceOf(addr1.address);

      await staking.connect(addr1).claim();

      const balanceAfter = await stellarToken.balanceOf(addr1.address);

      expect(balanceAfter).to.be.gt(balanceBefore);
    });
  });

  describe("Complete Staking Flow", function () {
    it("should handle stake, claim rewards twice, and withdraw correctly", async function () {
      const { staking, addr1 } = await loadFixture(deployStakingContract);

      const stakeAmount = ethers.parseEther("100"); // 100 MATIC pour simplifier
      await staking.connect(addr1).stake({ value: stakeAmount });

      expect(await staking.balanceOf(addr1.address)).to.equal(stakeAmount);

      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]); // Avancer le temps de 1 semaine
      await ethers.provider.send("evm_mine", []);
      await staking.connect(addr1).claim();

      await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]); // Avancer encore de 1 semaine
      await ethers.provider.send("evm_mine", []);
      await staking.connect(addr1).claim();

      const totalSMATICBalance = await staking.balanceOf(addr1.address);
      expect(totalSMATICBalance).to.be.gt(stakeAmount); // Le solde devrait être supérieur au montant initial du stake

      await staking.connect(addr1).withdraw(totalSMATICBalance);

      expect(await staking.balanceOf(addr1.address)).to.equal(0);
    });
  });
});