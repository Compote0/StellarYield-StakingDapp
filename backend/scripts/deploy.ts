import { ethers } from "hardhat";

async function deployStakingContract() {
	console.log(`Start deploying staking contract...`);
	const Staking = await ethers.deployContract("Staking");
	await Staking.waitForDeployment();
	console.log(`Staking contract is deployed to ${Staking.target}`);
	return Staking;
}

async function deployStellarContract() {
	console.log(`Start deploying stellar token contract...`);
	const StellarToken = await ethers.deployContract("StellarToken");
	await StellarToken.waitForDeployment();
	console.log(`Stellar token contract is deployed to ${StellarToken.target}`);
	return StellarToken;
}

async function deployStakingStellarContract() {
	console.log(`Start deploying Staking Stellar contract...`);
	const StakingStellar = await ethers.deployContract("StakingStellar");
	await StakingStellar.waitForDeployment();
	console.log(`Staking Stellar contract is deployed to ${StakingStellar.target}`);
	return StakingStellar;
}

async function deployContracts() {
	try {
		console.log(`Deploying contracts...`);
		const staking = await deployStakingContract();
		const stellarToken = await deployStellarContract();
		const stakingStellar = await deployStakingStellarContract();

	} catch (error) {
		console.error(error);
		process.exitCode = 1;
	}
}

deployContracts();
