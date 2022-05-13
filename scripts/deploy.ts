
import { ethers } from "hardhat";

async function main() {

  const Erc20Token = await ethers.getContractFactory("Erc20Token");
  const erc20token = await Erc20Token.deploy();
  await erc20token.deployed();

  console.log("Erc20Token deployed to:", erc20token.address);
 }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


