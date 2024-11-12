const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CertificateStorage", function () {
    let certificateStorage;
    let owner;
    let recipient;
    
    beforeEach(async function () {
        [owner, recipient] = await ethers.getSigners();
        
        const CertificateStorage = await ethers.getContractFactory("CertificateStorage");
        certificateStorage = await CertificateStorage.deploy();
        await certificateStorage.deployed();
    });

    describe("인증서 발급", function () {
        it("인증서를 성공적으로 발급해야 합니다", async function () {
            const ipfsHash = "QmTest123";
            const certificateType = "수료증";
            const issuerName = "아이러브클럽";

            await expect(certificateStorage.issueCertificate(
                recipient.address,
                ipfsHash,
                certificateType,
                issuerName
            ))
                .to.emit(certificateStorage, "CertificateIssued")
                .withArgs(1, recipient.address, ipfsHash, await ethers.provider.getBlock("latest").then(b => b.timestamp));

            const certificate = await certificateStorage.getCertificate(1);
            expect(certificate.ipfsHash).to.equal(ipfsHash);
            expect(certificate.recipient).to.equal(recipient.address);
            expect(certificate.isValid).to.be.true;
        });
    });

    describe("인증서 검증", function () {
        it("발급된 인증서를 검증할 수 있어야 합니다", async function () {
            await certificateStorage.issueCertificate(
                recipient.address,
                "QmTest123",
                "수료증",
                "아이러브클럽"
            );

            const isValid = await certificateStorage.verifyCertificate(1);
            expect(isValid).to.be.true;
        });
    });

    describe("인증서 취소", function () {
        it("인증서를 취소할 수 있어야 합니다", async function () {
            await certificateStorage.issueCertificate(
                recipient.address,
                "QmTest123",
                "수료증",
                "아이러브클럽"
            );

            await certificateStorage.revokeCertificate(1);
            const isValid = await certificateStorage.verifyCertificate(1);
            expect(isValid).to.be.false;
        });
    });
}); 