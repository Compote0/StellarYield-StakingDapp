import { ethers } from "hardhat";
import { expect } from "chai";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe.skip("PriceConsumer Tests", function () {
    async function deployPriceConsumerContract() {
        const PriceConsumer = await (ethers as any).getContractFactory("PriceConsumer");
        const feedAddress = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
        const priceConsumer = await PriceConsumer.deploy(feedAddress);
        await priceConsumer.waitForDeployment();

        return { priceConsumer };
    }

    describe("Deployment", function () {
        it("should deploy the contract", async function () {
            const { priceConsumer } = await loadFixture(deployPriceConsumerContract);

            expect(priceConsumer.address).to.be.equal(await priceConsumer.deployTransaction.get('address'));
        });
    });

    describe("Price Fetching", function () {
        it("should return a positive value for the latest price", async function () {
            const { priceConsumer } = await loadFixture(deployPriceConsumerContract);

            const latestPrice = await priceConsumer.getLatestPrice();
            expect(latestPrice).to.be.a('number');
            expect(latestPrice).to.be.greaterThan(0, "The latest price should be positive");
        });

        it("should return a valid decimals value", async function () {
            const { priceConsumer } = await loadFixture(deployPriceConsumerContract);

            const decimals = await priceConsumer.decimals();
            expect(decimals).to.be.a('number');
            expect(decimals).to.be.at.least(0, "Decimals should be a non-negative number");
        });
    });
});
