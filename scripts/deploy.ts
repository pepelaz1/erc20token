
import { ethers } from "hardhat";

async function main() {

  const Erc20Token = await ethers.getContractFactory("Erc20Token");
 // const erc20token = await Erc20Token.deploy("Pepelaz","PPLZ", 1000000000000000);
  const erc20token = await Erc20Token.deploy();
  await erc20token.deployed();

  console.log("Erc20Token deployed to:", erc20token.address);
  // 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512 
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


