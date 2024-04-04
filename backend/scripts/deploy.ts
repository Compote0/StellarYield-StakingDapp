
import { ethers } from "hardhat";

async function deployStellarTokenAndStakingContracts() {

	// Deploy Stellar token contract
	console.log(`Start deploying stellar token and staking contracts...`);
	const StellarToken = await ethers.deployContract("StellarToken");
	await StellarToken.waitForDeployment();
	const stellarAddress = StellarToken.target;
	console.log(`Stellar token contract is deployed to ${StellarToken.target}`);

	console.log(`Start calling faucet to mint tokens for the deployer...`);
	await StellarToken.faucet();
	console.log(`Tokens minted for the deployer.`);

	// Deploy Staking Stellar contract
	console.log(`Start deploying Staking Stellar contract...`);
	const StakingStellar = await ethers.deployContract("StakingStellar", [stellarAddress]);
	await StakingStellar.waitForDeployment();
	console.log(`Staking Stellar contract is deployed to ${StakingStellar.target}`);

	// Transfer tokens to Staking Stellar contract to cover rewards.
	console.log(`Transferring tokens to Staking Stellar contract to cover rewards...`);
	const transferAmount = ethers.parseEther("1000");
	await StellarToken.transfer(StakingStellar.getAddress(), transferAmount);
	console.log(`Tokens transferred to cover rewards.`);

	// Notify Staking Stellar contract of reward amount.
	const rewardAmount = ethers.parseEther("10");
	await StellarToken.approve(StakingStellar, rewardAmount);
	await StakingStellar.notifyRewardAmount(rewardAmount);
	console.log(`Reward amount notified.`);

	return { StakingStellar, StellarToken };
}

async function main() {
	try {
		console.log(`Deploying contracts...`);
		await deployStellarTokenAndStakingContracts();
	} catch (error) {
		console.error(`Deployment failed: ${error}`);
		process.exitCode = 1;
	}
}

main();