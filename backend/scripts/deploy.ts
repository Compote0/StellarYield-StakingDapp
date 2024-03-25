import { ethers } from "hardhat";

async function main() {
	const staking = await ethers.deployContract("Staking");

	await staking.waitForDeployment();

	console.log(`Voting contract deployed to ${staking.target}`);

}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
