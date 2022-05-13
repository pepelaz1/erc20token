
import { ethers } from "hardhat";

async function main() {

  const Erc20Token = await ethers.getContractFactory("Erc20Token");
  const erc20token = await Erc20Token.deploy("Pepelaz","PPLZ", 1000000000000000);
  await erc20token.deployed();

  console.log("Erc20Token deployed to:", erc20token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


