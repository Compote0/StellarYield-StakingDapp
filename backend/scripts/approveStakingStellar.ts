import { ethers } from "hardhat";

async function approveTotalBalanceForStaking(userAddress, tokenContractAddress, stakingContractAddress) {
    // Création d'une instance du contrat du token
    const TokenContract = await ethers.getContractAt("IERC20", tokenContractAddress);

    // Obtention de la balance totale de tokens de l'utilisateur
    const userBalance = await TokenContract.balanceOf(userAddress);

    // Appel de la fonction approve pour permettre au contrat de staking d'utiliser la balance totale
    const approveTx = await TokenContract.approve(stakingContractAddress, userBalance);
    await approveTx.wait();

    console.log(`User has approved ${userBalance} tokens for staking.`);
}

async function main() {
    const userAddress = "ADRESSE_DE_L_UTILISATEUR_ICI";
    const tokenContractAddress = "ADRESSE_DU_CONTRAT_DU_TOKEN_ICI";
    const stakingContractAddress = "ADRESSE_DU_CONTRAT_DE_STAKING_ICI";

    await approveTotalBalanceForStaking(userAddress, tokenContractAddress, stakingContractAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
