import { ethers } from "hardhat";

async function deployStakingContract() {

	console.log(`Start deploying staking contract...`);
	
	const Staking = await ethers.deployContract("Staking");
	await Staking.waitForDeployment();
	
	console.log(`Staking contract is deployed to ${Staking.target}`);
	
	return Staking;
}
	  
deployStakingContract().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
