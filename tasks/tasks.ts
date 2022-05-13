import { HardhatUserConfig, task } from "hardhat/config";

task("transfer", "Transfer token to some account")
.addParam("address","Address of the contract")
.addParam("to","Address to transfer token to")
.addParam("amount","Amount of token to transfer")
.setAction(async (taskArgs, hre) => {
    const { address: address, to: to, amount: amount } = taskArgs;
    const { abi } = await hre.artifacts.readArtifact("Erc20Token");
    const [signer] = await hre.ethers.getSigners();

    const contract = new hre.ethers.Contract(
        address, abi, signer
    )
    await contract.transfer(to, amount)
});


task("approve", "Approve token to some account")
.addParam("address","Address of the contract")
.addParam("to","Address to approve token to")
.addParam("amount","Amount of token to approve")
.setAction(async (taskArgs, hre) => {
    const { address: address, to: to, amount: amount } = taskArgs;
    const { abi } = await hre.artifacts.readArtifact("Erc20Token");
    const [signer] = await hre.ethers.getSigners();

    const contract = new hre.ethers.Contract(
        address, abi, signer
    )
    await contract.approve(to, amount)
});


task("transferFrom", "Transfer token from some account to other account")
.addParam("address","Address of the contract")
.addParam("approved","Address of approved account")
.addParam("from","Address to get token from")
.addParam("to","Address to get token to")
.addParam("amount","Amount of token to transfer")
.setAction(async (taskArgs, hre) => {
    const { address: address, approved: approved, from: from, to: to, amount: amount } = taskArgs;
    const { abi } = await hre.artifacts.readArtifact("Erc20Token");
    const [signer] = await hre.ethers.getSigners();

    const contract = new hre.ethers.Contract(
        address, abi, signer
    )

    const approvedSigner = await hre.ethers.getSigner(approved)
    await contract.connect(approvedSigner).transferFrom(from, to, amount)
});
