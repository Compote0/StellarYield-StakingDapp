import { ethers } from "hardhat";

async function deployStakingContract() {
	console.log(`Start deploying staking contract...`);
	const Staking = await ethers.deployContract("Staking");
	await Staking.waitForDeployment();
	console.log(`Staking contract is deployed to ${Staking.target}`);
	return Staking;
}

async function deployStellarStakingAndTokenContracts() {
	console.log(`Start deploying stellar token and staking contracts...`);
	const StellarToken = await ethers.deployContract("StellarToken");
	await StellarToken.waitForDeployment();
	const stellarAddress = StellarToken.target;
	console.log(`Stellar token contract is deployed to ${StellarToken.target}`);

	console.log(`Start deploying Staking Stellar contract...`);
	const StakingStellar = await ethers.deployContract("StakingStellar", [stellarAddress]);
	await StakingStellar.waitForDeployment();
	console.log(`Staking Stellar contract is deployed to ${StakingStellar.target}`);


	return { StakingStellar, StellarToken };
}

async function deployContracts() {
	try {
		console.log(`Deploying contracts...`);
		const staking = await deployStakingContract();
		const stellarStakingAndToken = await deployStellarStakingAndTokenContracts();

	} catch (error) {
		console.error(error);
		process.exitCode = 1;
	}
}

deployContracts();
