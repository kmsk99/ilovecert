const hre = require("hardhat");

async function main() {
  const CertificateContract = await hre.ethers.getContractFactory("CertificateContract");
  const certificate = await CertificateContract.deploy();

  await certificate.deployed();

  console.log("CertificateContract deployed to:", certificate.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 