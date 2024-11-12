const hre = require("hardhat");

async function main() {
  console.log("CertificateStorage 컨트랙트 배포를 시작합니다...");

  // 컨트랙트 팩토리 가져오기
  const CertificateStorage = await hre.ethers.getContractFactory("CertificateStorage");
  
  // 컨트랙트 배포
  const certificateStorage = await CertificateStorage.deploy();

  // 배포 완료 대기
  await certificateStorage.deployed();

  console.log("CertificateStorage가 다음 주소에 배포되었습니다:", certificateStorage.address);

  // 배포된 컨트랙트 주소를 환경 변수나 설정 파일에 저장하는 것을 잊지 마세요
}

// 스크립트 실행
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 