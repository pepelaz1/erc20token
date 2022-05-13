import { expect } from "chai";
import { ethers } from "hardhat";

describe("Erc20Token", function () {

  let acc1: any;

  let acc2: any;

  let acc3: any;

  let erc20token: any;

  beforeEach(async function() {
    [acc1, acc2, acc3] = await ethers.getSigners()
    const Erc20Token = await ethers.getContractFactory('Erc20Token', acc1)
    erc20token = await Erc20Token.deploy()
    await erc20token.deployed()  
  })


  it("should be deployed", async function(){
     expect(erc20token.address).to.be.properAddress
  })

  it("should be able to get token name", async function() {
     expect(await erc20token.name()).to.equal("Pepelaz");
  })

  it("should be able to get token symbol", async function() {
     expect(await erc20token.symbol()).to.equal("PPLZ");
  })

  it("should be able to get decimals", async function() {
      expect(await erc20token.decimals()).to.equal(18);
  })

  it("should be able to get total supply", async function() {
      expect(await erc20token.totalSupply()).to.equal("10000000000000000000000");
  })

  it("should be able to get owner balance", async function() {
      expect(await erc20token.balanceOf(acc1.address)).to.equal("10000000000000000000000");
  })

  it("should be able approve some amount of token to other account", async function() {
      const tx = await erc20token.approve(acc2.address, "5000000000000000000000");
      await tx.wait()

      expect(await erc20token.allowance(acc1.address, acc2.address)).to.equal("5000000000000000000000");
  })

  it("should be able transfer some amount", async function() {
      const tx = await erc20token.transfer(acc2.address, "1000000000000000000000");
      await tx.wait()

      expect(await erc20token.balanceOf(acc2.address)).to.equal("1000000000000000000000");
  })

  it("should not be able transfer more than current balance", async function() {
      await expect(
        erc20token.transfer(acc2.address, "11000000000000000000000")
      ).to.be.revertedWith("Not possible to transfer more than exising amount");
  })

  it("should be able transfer from some account to other account", async function() {
    let tx = await erc20token.approve(acc2.address, "5000000000000000000000");
    await tx.wait();

    tx = await erc20token.connect(acc2).transferFrom(acc1.address, acc3.address, "1000000000000000000000");
    await tx.wait()

    expect(await erc20token.balanceOf(acc3.address)).to.equal("1000000000000000000000");
  })

  it("should not be able transfer from some account more than existing amount", async function() {
    let tx = await erc20token.approve(acc2.address, "10000000000000000000000");
    await tx.wait();

    await expect(
      erc20token.transferFrom(acc1.address, acc3.address, "11000000000000000000000")
    ).to.be.revertedWith("Not possible to transfer more than exising amount");
  })

  it("should not be able transfer from some account more than approved amount", async function() {
    let tx = await erc20token.approve(acc2.address, "5000000000000000000000");
    await tx.wait();

    await expect(
      erc20token.transferFrom(acc1.address, acc3.address, "6000000000000000000000")
    ).to.be.revertedWith("Not possible to transfer more than approved amount");
  })

  it("should be able to mint some token", async function() {
    let tx = await erc20token.mint(acc2.address, "3000000000000000000000");
    await tx.wait();

    expect(await erc20token.totalSupply()).to.equal("13000000000000000000000");
  })

  it("should be able to burn some token", async function() {
    let tx = await erc20token.burn(acc1.address, "3000000000000000000000");
    await tx.wait();

    expect(await erc20token.totalSupply()).to.equal("7000000000000000000000");
  })

  it("should not be able to burn more than exising amount", async function() {
    await expect(
      erc20token.burn(acc1.address,  "11000000000000000000000")
    ).to.be.revertedWith("Not possible to burn more than exising amount");
  })

});


