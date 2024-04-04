import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking Stellar Tests", function () {
    // Fixture : function to deploy the contracts before each test
    async function deployAndSetupContractsFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy Stellar Token
        const StellarToken = await ethers.getContractFactory("StellarToken");
        const stellarToken = await StellarToken.deploy();
        await stellarToken.waitForDeployment();

        const mintAmount = ethers.parseEther("1000");
        await stellarToken.transfer(addr1.address, mintAmount);
        await stellarToken.transfer(addr2.address, mintAmount);

        // Deploy Staking contract with Stellar Token 
        const StakingStellar = await ethers.getContractFactory("StakingStellar");
        const stakingStellar = await StakingStellar.deploy(stellarToken.getAddress());
        await stakingStellar.waitForDeployment();

        // Approve Staking contract to spend addr1 and addr2's Stellar tokens
        await stellarToken.connect(addr1).approve(stakingStellar, mintAmount);
        await stellarToken.connect(addr2).approve(stakingStellar, mintAmount);

        // Deploy Malicious contract for testing reentrancy
        const MaliciousToken = await ethers.getContractFactory("MaliciousToken");
        const maliciousToken = await MaliciousToken.deploy(stakingStellar.getAddress());
        await maliciousToken.waitForDeployment();

        return { owner, addr1, addr2, stellarToken, stakingStellar, maliciousToken };
    }

    describe("Deployment", function () {
        it("should set the right owner", async function () {
            const { stakingStellar, owner } = await loadFixture(deployAndSetupContractsFixture);
            expect(await stakingStellar.owner()).to.equal(owner.address);
        });

        it("should have the correct Stellar token address", async function () {
            const { stakingStellar, stellarToken } = await loadFixture(deployAndSetupContractsFixture);
            expect(await stakingStellar.stellarToken()).to.equal(stellarToken);
        });
    });


    describe("Staking", function () {
        it("should allow users to stake tokens successfully", async function () {
            const { stakingStellar, stellarToken, addr1 } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            const initialStakingContractBalance = await stellarToken.balanceOf(stakingStellar);
            const initialAddr1Balance = await stellarToken.balanceOf(addr1.address);
            await stakingStellar.connect(addr1).stake(stakeAmount);
            const newStakingContractBalance = await stellarToken.balanceOf(stakingStellar);
            const newAddr1Balance = await stellarToken.balanceOf(addr1.address);

            expect(newStakingContractBalance).to.equal(initialStakingContractBalance + stakeAmount);
            expect(newAddr1Balance).to.equal(initialAddr1Balance - stakeAmount);
        });

        it("should emit a Staked event on successful staking", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);

            await expect(stakingStellar.connect(addr1).stake(stakeAmount))
                .to.emit(stakingStellar, "Staked")
                .withArgs(addr1.address, stakeAmount);
        });


        it("should update total staked amount accurately", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            const initialTotalStakedAmount = await stakingStellar.totalStakedAmount();

            await stakingStellar.connect(addr1).stake(stakeAmount);
            const newTotalStakedAmount = await stakingStellar.totalStakedAmount();

            // Verify amount is updated correctly
            expect(newTotalStakedAmount).to.equal(initialTotalStakedAmount + stakeAmount);
        });

        it("should revert for zero amount staking", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("0");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);

            await expect(stakingStellar.connect(addr1).stake(stakeAmount))
                .to.be.revertedWith("Amount must be greater than 0");
        });

        it("should update user's staked token balance accurately", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);

            const initialStakedBalance = await stakingStellar.stakedTokens(addr1.address);

            await stakingStellar.connect(addr1).stake(stakeAmount);

            const newStakedBalance = await stakingStellar.stakedTokens(addr1.address);
            expect(newStakedBalance).to.equal(initialStakedBalance + stakeAmount);
        });
    });

    describe("Withdrawing Staked Tokens", function () {
        it("should allow users to withdraw their staked tokens successfully", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");

            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            await stakingStellar.connect(addr1).stake(stakeAmount);

            const initialStellarBalance = await stellarToken.balanceOf(addr1.address);

            const initialStakedBalance = await stakingStellar.stakedTokens(addr1.address);

            await ethers.provider.send("evm_increaseTime", [864000]); //10 days
            await ethers.provider.send("evm_mine", []);

            await stakingStellar.connect(addr1).withdraw(stakeAmount);
            const newStellarBalance = await stellarToken.balanceOf(addr1.address);
            const newStakedBalance = await stakingStellar.stakedTokens(addr1.address);

            expect(newStakedBalance).to.equal(initialStakedBalance - stakeAmount);
            expect(newStellarBalance).to.equal(initialStellarBalance + stakeAmount);
        });

        it("should emit a Withdrawn event on successful withdrawal", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            await stakingStellar.connect(addr1).stake(stakeAmount);

            await ethers.provider.send("evm_increaseTime", [864000]); //10 days
            await ethers.provider.send("evm_mine", []);

            await expect(stakingStellar.connect(addr1).withdraw(stakeAmount))
                .to.emit(stakingStellar, "Withdrawn")
                .withArgs(addr1.address, stakeAmount);
        });

        it("should revert if the user tries to withdraw more than their balance", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            await stakingStellar.connect(addr1).stake(stakeAmount);

            const excessiveAmountToWithdraw = ethers.parseEther("1000");

            await ethers.provider.send("evm_increaseTime", [864000]); //10 days
            await ethers.provider.send("evm_mine", []);

            await expect(stakingStellar.connect(addr1).withdraw(excessiveAmountToWithdraw))
                .to.be.revertedWith("Withdrawal amount exceeds balance");
        });

        it("should revert if the user tries to withdraw before unlock time", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseEther("100");
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            await stakingStellar.connect(addr1).stake(stakeAmount);


            await ethers.provider.send("evm_increaseTime", [86400 / 2]); // 12 h
            await ethers.provider.send("evm_mine", []);

            await expect(stakingStellar.connect(addr1).withdraw(stakeAmount))
                .to.be.revertedWith("Tokens are still locked");

            // reach unlock time
            await ethers.provider.send("evm_increaseTime", [86400 / 2]);
            await ethers.provider.send("evm_mine", []);
        });

        it("should update the total staked amount accurately after withdrawal", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const initialStakeAmount = ethers.parseEther("200");
            const withdrawAmount = ethers.parseEther("100");

            await stellarToken.connect(addr1).approve(stakingStellar, initialStakeAmount);
            await stakingStellar.connect(addr1).stake(initialStakeAmount);

            const totalStakedAfterStake = await stakingStellar.totalStakedAmount();

            await ethers.provider.send("evm_increaseTime", [864000]); //10 days
            await ethers.provider.send("evm_mine", []);

            await stakingStellar.connect(addr1).withdraw(withdrawAmount);

            const totalStakedAfterWithdraw = await stakingStellar.totalStakedAmount();

            expect(totalStakedAfterWithdraw).to.equal(totalStakedAfterStake - withdrawAmount);
        });
    });

    describe("Earning Rewards", function () {
        it("should calculate the correct reward for each user", async function () {
            const { addr1, addr2, stakingStellar } = await deployAndSetupContractsFixture();

            // Stake amounts
            const stakeAmountAddr1 = ethers.parseEther("100");
            const stakeAmountAddr2 = ethers.parseEther("200");

            // Staking
            await stakingStellar.connect(addr1).stake(stakeAmountAddr1);
            await stakingStellar.connect(addr2).stake(stakeAmountAddr2);

            // Advance time by 1 week
            await ethers.provider.send("evm_increaseTime", [86400 * 7]); // 7 days in seconds
            await ethers.provider.send("evm_mine");

            // Notify reward amount
            const totalReward = await stakingStellar.totalStakedAmount();
            await stakingStellar.notifyRewardAmount(totalReward);

            // Advance time by another week
            await ethers.provider.send("evm_increaseTime", [86400 * 7]); // 7 days in seconds
            await ethers.provider.send("evm_mine");

            // Calculate expected rewards
            const totalStaked = await stakingStellar.totalStakedAmount();
            const expectedRewardAddr1 = totalReward * stakeAmountAddr1 / totalStaked;
            const expectedRewardAddr2 = totalReward * stakeAmountAddr2 / totalStaked;

            // Get actual rewards
            const actualRewardAddr1 = await stakingStellar.earned(addr1.address);
            const actualRewardAddr2 = await stakingStellar.earned(addr2.address);

            console.log(`Actual Reward Addr1: ${ethers.formatEther(actualRewardAddr1)}`);
            console.log(`Actual Reward Addr2: ${ethers.formatEther(actualRewardAddr2)}`);

            // Assert that actual rewards are close to expected rewards
            expect(actualRewardAddr1).to.be.closeTo(expectedRewardAddr1, ethers.parseEther("0.01"));
            expect(actualRewardAddr2).to.be.closeTo(expectedRewardAddr2, ethers.parseEther("0.01"));
        });

        it("should allow users to claim their rewards successfully", async function () {
            const { addr1, addr2, stakingStellar, stellarToken } = await deployAndSetupContractsFixture();

            // Stake amounts by two users
            const stakeAmountAddr1 = ethers.parseEther("100");
            const stakeAmountAddr2 = ethers.parseEther("200");
            await stakingStellar.connect(addr1).stake(stakeAmountAddr1);
            await stakingStellar.connect(addr2).stake(stakeAmountAddr2);

            // Simulate time passage to accumulate rewards
            let timeToAdvance = 86400 * 7; // 7 days in seconds
            await ethers.provider.send("evm_increaseTime", [timeToAdvance]);
            await ethers.provider.send("evm_mine");

            // Notify reward amount
            const totalReward = ethers.parseEther("300");
            await stakingStellar.notifyRewardAmount(totalReward);

            // Simulate time passage again if necessary
            await ethers.provider.send("evm_increaseTime", [timeToAdvance]);
            await ethers.provider.send("evm_mine");

            // Save initial balances
            const initialBalanceAddr1 = await stellarToken.balanceOf(addr1.address);
            const initialBalanceAddr2 = await stellarToken.balanceOf(addr2.address);

            // Users claim their rewards
            await stakingStellar.connect(addr1).getReward();
            await stakingStellar.connect(addr2).getReward();

            const finalBalanceAddr1 = await stellarToken.balanceOf(addr1.address);
            const finalBalanceAddr2 = await stellarToken.balanceOf(addr2.address);

            const totalRewardNumber = Number(totalReward);
            const initialBalanceAddr1Number = Number(initialBalanceAddr1);
            const initialBalanceAddr2Number = Number(initialBalanceAddr2);
            const finalBalanceAddr1Number = Number(finalBalanceAddr1);
            const finalBalanceAddr2Number = Number(finalBalanceAddr2);

            expect(finalBalanceAddr1Number - initialBalanceAddr1Number).to.be.closeTo(totalRewardNumber / 3, 0.01); // Addr1 should get 1/3 of the rewards
            expect(finalBalanceAddr2Number - initialBalanceAddr2Number).to.be.closeTo((totalRewardNumber * 2) / 3, 0.01); // Addr2 should get 2/3 of the rewards
        });

        it("should emit a RewardPaid event on successful reward claim", async function () {
            const { addr1, stakingStellar } = await deployAndSetupContractsFixture();

            const stakeAmount = ethers.parseEther("100");
            await stakingStellar.connect(addr1).stake(stakeAmount);

            // Advance time by 7 days to trigger reward distribution
            await ethers.provider.send("evm_increaseTime", [7 * 24 * 60 * 60]);
            await ethers.provider.send("evm_mine");

            // Claim reward and test emit
            const reward = ethers.parseEther("10");
            await expect(stakingStellar.connect(addr1).getReward())
                .to.emit(stakingStellar, "RewardPaid")
                .withArgs(addr1.address, reward);
        });

    });

    describe("Get Users Details", function () {
        it("should return user stakedAmount", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            const stakeAmount = ethers.parseUnits("100", 18);

            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            await stakingStellar.connect(addr1).stake(stakeAmount);

            const userDetails = await stakingStellar.getUserDetails(addr1.address);

            expect(userDetails.stakedAmount).to.equal(stakeAmount);
        });

        it("should return user pendingRewards", async function () {
            const { addr1, stakingStellar, stellarToken } = await deployAndSetupContractsFixture();

            const stakeAmountAddr1 = ethers.parseEther("100");

            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmountAddr1);
            await stakingStellar.connect(addr1).stake(stakeAmountAddr1);

            await ethers.provider.send("evm_increaseTime", [86400 * 7]);
            await ethers.provider.send("evm_mine");

            const rewardAmount = ethers.parseEther("10");
            await stakingStellar.notifyRewardAmount(rewardAmount);

            await ethers.provider.send("evm_increaseTime", [86400 * 7]);
            await ethers.provider.send("evm_mine");

            const userDetails = await stakingStellar.getUserDetails(addr1.address);
            const actualRewardAddr1 = userDetails.pendingRewards;

            expect(actualRewardAddr1).to.be.closeTo(rewardAmount, ethers.parseEther("0.01"));
        });

        it("should return user unlockTime", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            // Amount to be staked
            const stakeAmount = ethers.parseUnits("100", 18);

            // Approve and stake tokens
            await stellarToken.connect(addr1).approve(stakingStellar, stakeAmount);
            await stakingStellar.connect(addr1).stake(stakeAmount);

            // Get the current block timestamp
            const blockTimestampBeforeStaking = (await (ethers as any).provider.getBlock('latest')).timestamp;

            // Get user details
            const userDetails = await stakingStellar.getUserDetails(addr1.address);

            // Calculate expected unlock time (1 week after staking)
            const expectedUnlockTime = blockTimestampBeforeStaking + 604800; // 604800 seconds in a week

            // Validate returned unlockTime
            expect(userDetails.unlockTime).to.be.closeTo(expectedUnlockTime, 5);
        });
    });

    describe("Rewards and Updates", function () {
        it("should update reward rate correctly when notified with new reward amount", async function () {
            const { stakingStellar, addr1, owner, stellarToken } = await loadFixture(deployAndSetupContractsFixture);

            await stellarToken.connect(owner).transfer(stakingStellar, ethers.parseEther("1000"));

            await stakingStellar.connect(addr1).stake(ethers.parseEther("100"));

            await stakingStellar.notifyRewardAmount(ethers.parseEther("50"));
            const initialRewardRate = await stakingStellar.rewardRate();

            await ethers.provider.send("evm_increaseTime", [86400 * 3]);
            await ethers.provider.send("evm_mine");

            await stakingStellar.notifyRewardAmount(ethers.parseEther("50"));
            const newRewardRate = await stakingStellar.rewardRate();

            expect(newRewardRate).to.not.equal(initialRewardRate);
        });

        it("should prevent new reward notification if the provided reward is too high", async function () { });

        it("should allow updating the rewards duration by the owner", async function () { });

        it("should prevent rewards duration update during an active reward period", async function () { });

        it("should revert if the previous rewards period is not completed before changing the duration for the new period", async function () {
            const { stakingStellar } = await loadFixture(deployAndSetupContractsFixture);

            const rewardAmount = ethers.parseEther("100");
            await stakingStellar.notifyRewardAmount(rewardAmount);

            const newRewardsDuration = 14 * 24 * 60 * 60; // 14 days

            await expect(
                stakingStellar.setRewardsDuration(newRewardsDuration)
            ).to.be.revertedWith("Previous rewards period must be complete before changing the duration for the new period");

            await ethers.provider.send("evm_increaseTime", [Number(rewardAmount) + 1]);
            await ethers.provider.send("evm_mine");

            await expect(stakingStellar.setRewardsDuration(newRewardsDuration))
                .to.emit(stakingStellar, "RewardsDurationUpdated")
                .withArgs(newRewardsDuration);
        });

        it("should emit RewardsDurationUpdated event on successful update", async function () {
            const { stakingStellar } = await loadFixture(deployAndSetupContractsFixture);

            const newRewardsDuration = 14 * 24 * 60 * 60; //14d 

            await expect(stakingStellar.setRewardsDuration(newRewardsDuration))
                .to.emit(stakingStellar, "RewardsDurationUpdated")
                .withArgs(newRewardsDuration);

            const updatedRewardsDuration = await stakingStellar.rewardsDuration();
            expect(updatedRewardsDuration).to.equal(newRewardsDuration);
        });
    });

    describe("Access Control and Ownership", function () {
        it("should not allow non-owner to notify new reward amount", async function () {
            const { stakingStellar, addr1 } = await loadFixture(deployAndSetupContractsFixture);

            const rewardAmount = ethers.parseEther("100");

            await expect(
                stakingStellar.connect(addr1).notifyRewardAmount(rewardAmount)
            ).to.be.reverted;
        });
        it("should not allow non-owner to set reward duration", async function () {
            const { stakingStellar, addr1 } = await loadFixture(deployAndSetupContractsFixture);

            const newRewardsDuration = 14 * 24 * 60 * 60; //14d for instance

            await expect(
                stakingStellar.connect(addr1).setRewardsDuration(newRewardsDuration)
            ).to.be.reverted;
        });

        it("should transfer ownership successfully", async function () {
            const { stakingStellar, owner, addr1 } = await loadFixture(deployAndSetupContractsFixture);

            const initialOwner = await stakingStellar.owner();
            expect(initialOwner).to.equal(owner.address);

            await stakingStellar.transferOwnership(addr1.address);

            const newOwner = await stakingStellar.owner();
            expect(newOwner).to.equal(addr1.address);
        });

        it("should prevent non-owners from calling restricted functions", async function () {
            const { stakingStellar, addr1 } = await loadFixture(deployAndSetupContractsFixture);

            const rewardAmount = ethers.parseEther("100");
            await expect(
                stakingStellar.connect(addr1).notifyRewardAmount(rewardAmount)
            ).to.be.reverted;

            const newRewardsDuration = 14 * 24 * 60 * 60; // 14 days
            await expect(
                stakingStellar.connect(addr1).setRewardsDuration(newRewardsDuration)
            ).to.be.reverted;
        });
    });

    describe("Reentrency attacks", function () {
        it("should prevent reentrancy on stake function", async function () {
            const { stakingStellar, maliciousToken } = await loadFixture(deployAndSetupContractsFixture);
            const [owner, attacker] = await ethers.getSigners();

            await maliciousToken.connect(attacker).approve(stakingStellar, ethers.parseEther("100"));
            await expect(
                maliciousToken.connect(attacker).transferFrom(attacker.address, stakingStellar, ethers.parseEther("100"))
            ).to.be.reverted;

        });

        it("should prevent reentrancy on withdraw function", async function () {
            const { stakingStellar, maliciousToken } = await loadFixture(deployAndSetupContractsFixture);
            const [owner, attacker] = await ethers.getSigners();

            await maliciousToken.connect(attacker).approve(stakingStellar, ethers.parseEther("100"));
            await expect(
                maliciousToken.connect(attacker).transferFrom(attacker.address, stakingStellar, ethers.parseEther("100"))
            ).to.be.reverted;

        });


        it("should prevent reentrancy on getReward function", async function () {
            const { stakingStellar, maliciousToken } = await loadFixture(deployAndSetupContractsFixture);
            const [owner, attacker] = await ethers.getSigners();

            await maliciousToken.connect(attacker).approve(stakingStellar, ethers.parseEther("100"));
            await expect(
                maliciousToken.connect(attacker).transferFrom(attacker.address, stakingStellar, ethers.parseEther("100"))
            ).to.be.reverted;
        });
    });
});