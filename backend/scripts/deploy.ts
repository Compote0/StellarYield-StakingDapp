import { ethers } from "hardhat";

async function deployRewardTokenContract() {

	console.log(`Start deploying reward token contract...`);
	
	const RewardToken = await ethers.deployContract("RewardToken");
	await RewardToken.waitForDeployment();
	
	console.log(`Reward Token contract is deployed to ${RewardToken.target}`);
	
	return RewardToken;
}
	  
deployRewardTokenContract().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
