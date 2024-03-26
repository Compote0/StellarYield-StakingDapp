import { ethers } from "hardhat";
import { assert, expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("sMATIC Token Contract", function () {
    async function deploysMATIC() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        
        // Deploy reward token contract
        // Deploy staking contract with the address of the sMATIC token contract

    
        return { sMATIC, staking, owner, addr1, addr2 };
      }

  describe("Minting", function () {
    
    it("Should mint new tokens to specified address", async function () {
        const { sMATIC, owner, addr1 } = await loadFixture(deploysMATIC);
        const mintAmount = ethers.parseUnits("100", 18); // 100 sMATIC
        await sMATIC.mint(addr1.address, mintAmount);
        expect(await sMATIC.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint tokens", async function () {
        const { sMATIC, owner, addr1, addr2 } = await loadFixture(deploysMATIC);
        const mintAmount = ethers.utils.parseUnits("50", 18); // 50 sMATIC
        await expect(sMATIC.connect(addr1).mint(addr2.address, mintAmount))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Burning", function () {
    it("Should burn tokens from specified address", async function () {
        const { sMATIC, owner, addr1, addr2 } = await loadFixture(deploysMATIC);
        const burnAmount = ethers.utils.parseUnits("50", 18); // 50 sMATIC
        await sMATIC.burn(addr1.address, burnAmount);
        expect(await sMATIC.balanceOf(addr1.address)).to.equal(ethers.utils.parseUnits("50", 18)); // 50 sMATIC remaining
    });

    it("Should not allow non-owner to burn tokens", async function () {
        const { sMATIC, owner, addr1 } = await loadFixture(deploysMATIC);
        const burnAmount = ethers.utils.parseUnits("10", 18); // 10 sMATIC
        await expect(sMATIC.connect(addr1).burn(addr1.address, burnAmount))
            .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Ownership", function () {
    it("Should set the right owner", async function () {
        expect(await staking.owner()).to.equal(owner.address);
    });
  });
});
