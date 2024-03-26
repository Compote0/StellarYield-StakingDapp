import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking Tests", function () {
  async function deployStakingContract() {
    const [owner, addr1, addr2, addr3] = await ethers.getSigners();

    // Deploy staking contract with the address of the sMATIC token contract
    const Staking = await ethers.getContractFactory("Staking");
    const staking = await Staking.deploy();
    await staking.waitForDeployment();

    return { staking, owner, addr1, addr2, addr3 };
  }

  describe("Deployment", function () {
    it("should deploy the contract", async function () {
			const { staking, owner } = await loadFixture(deployStakingContract);

			let theOwner = await staking.owner();

			assert.equal(owner.address, theOwner);
		});
    it("Should set the right owner", async function () {
      const { staking, owner } = await loadFixture(deployStakingContract);
      expect(await staking.owner()).to.equal(owner.address);
    });
  });
});