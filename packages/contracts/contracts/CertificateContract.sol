// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateContract {
    struct Certificate {
        uint256 id;
        address issuer;
        address recipient;
        string metadataURI;
        uint256 issuedAt;
        bool isValid;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(address => bool) public issuers;
    uint256 private _certificateCounter;
    address public admin;

    event CertificateIssued(uint256 indexed id, address indexed issuer, address indexed recipient);
    event CertificateRevoked(uint256 indexed id);
    event IssuerAdded(address indexed issuer);
    event IssuerRemoved(address indexed issuer);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Only issuer can call this function");
        _;
    }

    constructor() {
        admin = msg.sender;
        issuers[msg.sender] = true;
    }

    function addIssuer(address issuer) external onlyAdmin {
        issuers[issuer] = true;
        emit IssuerAdded(issuer);
    }

    function removeIssuer(address issuer) external onlyAdmin {
        issuers[issuer] = false;
        emit IssuerRemoved(issuer);
    }

    function issueCertificate(address recipient, string memory metadataURI) external onlyIssuer returns (uint256) {
        _certificateCounter++;
        certificates[_certificateCounter] = Certificate({
            id: _certificateCounter,
            issuer: msg.sender,
            recipient: recipient,
            metadataURI: metadataURI,
            issuedAt: block.timestamp,
            isValid: true
        });

        emit CertificateIssued(_certificateCounter, msg.sender, recipient);
        return _certificateCounter;
    }

    function revokeCertificate(uint256 certificateId) external {
        Certificate storage cert = certificates[certificateId];
        require(msg.sender == cert.issuer || msg.sender == admin, "Not authorized");
        require(cert.isValid, "Certificate already revoked");
        
        cert.isValid = false;
        emit CertificateRevoked(certificateId);
    }

    function validateCertificate(uint256 certificateId) external view returns (bool) {
        return certificates[certificateId].isValid;
    }
} 