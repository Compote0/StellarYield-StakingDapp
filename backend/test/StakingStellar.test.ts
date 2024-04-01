import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking Stellar Tests", function () {
    // Fixture : function to deploy the contracts before each test
    async function deployContractsFixture() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        // Déployer le token Stellar
        const StellarToken = await ethers.getContractFactory("StellarToken");
        const stellarToken = await StellarToken.deploy();
        await stellarToken.waitForDeployment();

        // Approvisionner les testeurs en tokens Stellar
        await stellarToken.transfer(addr1.address, ethers.parseEther("1000"));
        await stellarToken.transfer(addr2.address, ethers.parseEther("1000"));

        // Déployer le contrat de staking
        const StakingStellar = await ethers.getContractFactory("StakingStellar");
        const stakingStellar = await StakingStellar.deploy();
        await stakingStellar.waitForDeployment();

        await stellarToken.connect(addr1).approve(stakingStellar.address, ethers.parseEther("1000"));
        await stellarToken.connect(addr2).approve(stakingStellar.address, ethers.parseEther("1000"));

        return { stellarToken, stakingStellar, owner, addr1, addr2 };
    }

    describe("Deployment", function () {
        it("should set the right owner", async function () {
            const { stakingStellar, owner } = await loadFixture(deployContractsFixture);
            expect(await stakingStellar.owner()).to.equal(owner.address);
        });

        it("should have the correct Stellar token address", async function () {
            const { stakingStellar, stellarToken } = await loadFixture(deployContractsFixture);
            expect(await stakingStellar.stakingTokenAddress()).to.equal(stellarToken.address);
        });
    });

    describe("Staking", function () {
        it("Should allow users to stake tokens", async function () {
            const { stakingStellar, addr1 } = await loadFixture(deployContractsFixture);
            await expect(stakingStellar.connect(addr1).stake(ethers.parseEther("100")))
                .to.emit(stakingStellar, "TokensStaked")
                .withArgs(addr1.address, ethers.parseEther("100"));

            const stakerInfo = await stakingStellar.getStakerInfo(addr1.address);
            expect(stakerInfo.stakedTokens).to.equal(ethers.parseEther("100"));
        });

        it("Should accurately track total staked tokens", async function () {
            const { stakingStellar, addr1, addr2 } = await loadFixture(deployContractsFixture);
            await stakingStellar.connect(addr1).stake(ethers.parseEther("100"));
            await stakingStellar.connect(addr2).stake(ethers.parseEther("200"));

            expect(await stakingStellar.totalStakedAmount()).to.equal(ethers.parseEther("300"));
        });
    });

    describe("Unstaking and Rewards", function () {
        it("Should allow users to unstake tokens and receive rewards", async function () {
            const { stakingStellar, addr1, stellarToken } = await loadFixture(deployContractsFixture);
            await stakingStellar.connect(addr1).stake(ethers.parseEther("100"));

            // Avancer le temps pour générer des récompenses
            await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 30]); // Avancer d'un mois
            await ethers.provider.send("evm_mine", []);

            const initialBalance = await stellarToken.balanceOf(addr1.address);
            await stakingStellar.connect(addr1).withdraw();
            const finalBalance = await stellarToken.balanceOf(addr1.address);

            expect(finalBalance).to.be.gt(initialBalance);
        });

        it("Should emit Withdraw event with correct values", async function () {
            const { stakingStellar, addr1 } = await loadFixture(deployContractsFixture);
            await stakingStellar.connect(addr1).stake(ethers.parseEther("100"));

            await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 7]); // 7 jours pour simplifier le calcul des récompenses
            await ethers.provider.send("evm_mine", []);

            await expect(stakingStellar.connect(addr1).withdraw())
                .to.emit(stakingStellar, "TokensUnstaked");
        });
    });
});