// SPDX-License-Identifier: ISC
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CertificateStorage is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _certificateIds;

    struct Certificate {
        uint256 id;
        string ipfsHash;
        address recipient;
        uint256 issuedAt;
        bool isValid;
        string certificateType;
        string issuerName;
    }

    // certificateId => Certificate
    mapping(uint256 => Certificate) private certificates;
    
    // recipient address => certificateIds
    mapping(address => uint256[]) private userCertificates;

    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed recipient,
        string ipfsHash,
        uint256 issuedAt
    );

    event CertificateRevoked(
        uint256 indexed certificateId,
        address indexed recipient
    );

    constructor() Ownable() {}

    function issueCertificate(
        address recipient,
        string memory ipfsHash,
        string memory certificateType,
        string memory issuerName
    ) external onlyOwner returns (uint256) {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(recipient != address(0), "Invalid recipient address");

        _certificateIds.increment();
        uint256 newCertificateId = _certificateIds.current();

        Certificate memory newCertificate = Certificate({
            id: newCertificateId,
            ipfsHash: ipfsHash,
            recipient: recipient,
            issuedAt: block.timestamp,
            isValid: true,
            certificateType: certificateType,
            issuerName: issuerName
        });

        certificates[newCertificateId] = newCertificate;
        userCertificates[recipient].push(newCertificateId);

        emit CertificateIssued(
            newCertificateId,
            recipient,
            ipfsHash,
            block.timestamp
        );

        return newCertificateId;
    }

    function revokeCertificate(uint256 certificateId) external onlyOwner {
        require(certificates[certificateId].isValid, "Certificate already revoked or doesn't exist");
        
        certificates[certificateId].isValid = false;
        
        emit CertificateRevoked(
            certificateId,
            certificates[certificateId].recipient
        );
    }

    function getCertificate(uint256 certificateId) external view returns (Certificate memory) {
        return certificates[certificateId];
    }

    function getUserCertificates(address user) external view returns (Certificate[] memory) {
        uint256[] memory certificateIds = userCertificates[user];
        Certificate[] memory userCerts = new Certificate[](certificateIds.length);
        
        for (uint256 i = 0; i < certificateIds.length; i++) {
            userCerts[i] = certificates[certificateIds[i]];
        }
        
        return userCerts;
    }

    function verifyCertificate(uint256 certificateId) external view returns (bool) {
        return certificates[certificateId].isValid;
    }
} 