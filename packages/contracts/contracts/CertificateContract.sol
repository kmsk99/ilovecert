// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateContract {
    struct Certificate {
        uint256 id;
        address issuer;
        string recipientName;
        string metadataURI;
        uint256 issuedAt;
        bool isValid;
        string certificateType;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(address => bool) public issuers;
    mapping(address => uint256[]) private userCertificates;
    
    uint256 private _certificateCounter;
    address public admin;

    event CertificateIssued(uint256 indexed id, address indexed issuer, string recipientName);
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
        require(!issuers[issuer], "Already an issuer");
        issuers[issuer] = true;
        emit IssuerAdded(issuer);
    }

    function removeIssuer(address issuer) external onlyAdmin {
        require(issuer != admin, "Cannot remove admin");
        require(issuers[issuer], "Not an issuer");
        issuers[issuer] = false;
        emit IssuerRemoved(issuer);
    }

    function issueCertificate(
        string memory recipientName,
        string memory metadataURI,
        string memory certificateType
    ) external onlyIssuer returns (uint256) {
        require(bytes(recipientName).length > 0, "Recipient name cannot be empty");
        require(bytes(metadataURI).length > 0, "Metadata URI cannot be empty");
        require(bytes(certificateType).length > 0, "Certificate type cannot be empty");

        _certificateCounter++;
        
        certificates[_certificateCounter] = Certificate({
            id: _certificateCounter,
            issuer: msg.sender,
            recipientName: recipientName,
            metadataURI: metadataURI,
            issuedAt: block.timestamp,
            isValid: true,
            certificateType: certificateType
        });

        userCertificates[msg.sender].push(_certificateCounter);

        emit CertificateIssued(_certificateCounter, msg.sender, recipientName);
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

    function getUserCertificates(address user) external view returns (uint256[] memory) {
        uint256[] memory allCertificates = userCertificates[user];
        uint256 validCount = 0;
        
        for(uint256 i = 0; i < allCertificates.length; i++) {
            if(certificates[allCertificates[i]].isValid) {
                validCount++;
            }
        }
        
        uint256[] memory validCertificates = new uint256[](validCount);
        uint256 currentIndex = 0;
        
        for(uint256 i = 0; i < allCertificates.length; i++) {
            if(certificates[allCertificates[i]].isValid) {
                validCertificates[currentIndex] = allCertificates[i];
                currentIndex++;
            }
        }
        
        return validCertificates;
    }

    function getCertificate(uint256 certificateId) external view returns (
        uint256 id,
        address issuer,
        string memory recipientName,
        string memory metadataURI,
        uint256 issuedAt,
        bool isValid,
        string memory certificateType
    ) {
        Certificate memory cert = certificates[certificateId];
        return (
            cert.id,
            cert.issuer,
            cert.recipientName,
            cert.metadataURI,
            cert.issuedAt,
            cert.isValid,
            cert.certificateType
        );
    }
} 