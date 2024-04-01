import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Stellar Token Tests", function () {
    // Fixture : function to deploy the contracts before each test
    async function StellarTokenContract() {
        const [owner, addr1, addr2] = await ethers.getSigners();

        // Déployer le token Stellar
        const StellarToken = await ethers.getContractFactory("StellarToken");
        const stellarToken = await StellarToken.deploy();
        await stellarToken.waitForDeployment();

        return { stellarToken, owner, addr1, addr2 };
    }

    describe("Deployment", function () {
        it("should set the right owner", async function () {
            const { stellarToken, owner } = await loadFixture(StellarTokenContract);
            expect(await stellarToken.owner()).to.equal(owner.address);
        });
    });

    describe("Faucet", function () {
        it("should allow to faucet tokens", async function () {
            const { stellarToken, addr1 } = await loadFixture(StellarTokenContract);
            await stellarToken.connect(addr1).faucet();
            const expectedAmount = ethers.parseUnits("10", 18);
            expect(await stellarToken.balanceOf(addr1.address)).to.equal(expectedAmount);
        });
    });

    describe("Transfer", function () {
        it("should allow to transfer tokens", async function () {
            const { stellarToken, addr1, addr2 } = await loadFixture(StellarTokenContract);
        });
    });
});