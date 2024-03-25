import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Staking Tests", function () {
	async function deployVotingContract() {
		const [owner, addr1, addr2, addr3] = await ethers.getSigners();

		const Staking = await (ethers as any).getContractFactory("Staking");
		const staking = await Staking.deploy(Staking);

		return { staking, owner, addr1, addr2, addr3 };
  }

    describe("initiation", function () {
        it("should be able to deploy contract", async function () {
          const { staking } = await loadFixture(deployVotingContract);
          let owner = await staking.owner();
          assert.equal(owner, staking.address);
        });
    });
});