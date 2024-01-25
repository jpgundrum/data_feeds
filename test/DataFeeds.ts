import {time, loadFixture,} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
const { ethers } = require("hardhat");


const numDataAggregators = 13;

const eth_usd = 0x694AA1769357215DE4FAC081bf1f309aDC325306; // ETH/USD
const btc_usd = 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43; // BTC/USD
const link_usd = 0xc59E3633BAAC79493d908e63626716e204A45EdF; // LINK/USD

/**
 * Tests DataConsumerV3 contract for correct functionality
 */
describe("DataConsumerTests", function() {
 /**
  * Fixture to be ran before each test to deploy a new contract
  * 
  * Returns:
  * --------
  * const: profiles
  *    Object representation of the contract that was deployed
  * const: owner
  *    Owner of the contract that deployed the contract
  * const: otherAccount
  *    Another owner of the contract
  */
  async function deployContractFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const DataConsumer = await ethers.getContractFactory("DataConsumerV3");
    const dataConsumer = await DataConsumer.deploy();

    return {dataConsumer, owner, otherAccount};
}

  describe("Deployment & contructor testing", function() {
    it("Check owner's address", async function () {
      const {dataConsumer, owner, otherAccount} = await loadFixture(deployContractFixture);
      expect(owner.address).to.equal(dataConsumer.runner.address);
    });
    // Other account's address is as expected
    it("Check other account address", async function () {
      const {dataConsumer, owner, otherAccount} = await loadFixture(deployContractFixture);

      expect(otherAccount.address).to.equal("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    });
    // 13 data aggregators should be created
    it("Check deployment to the contract with sepolia router", async function () {
      const {dataConsumer, owner, otherAccount} = await loadFixture(deployContractFixture);
      const receviedNumber = await dataConsumer.countDataAggregators();

      expect(receviedNumber).to.equal(numDataAggregators);
    });
  });
  describe("Test data arrays that live inside the contract", function() {
    it("Check addDecimals method", async function () {
      // TODO create a mocked contract to replicate price feed data

      const {dataConsumer, owner, otherAccount} = await loadFixture(deployContractFixture);
      const transaction = await dataConsumer.addDecimals();
      const receipt = await transaction.wait();

      console.log(receipt.logs);
      // expect(receviedNumber).to.equal(1);
    });

  });

});