# iLoveCert (아이러브클럽 인증서 발급 시스템)

블록체인 기반의 디지털 인증서 발급 및 검증 시스템입니다. 이 프로젝트는 IPFS를 통한 인증서 저장과 이더리움 블록체인을 통한 검증을 제공합니다.

## 기술 스택

- **Frontend**: React.js
- **Backend**: Express.js
- **Blockchain**: Ethereum (Hardhat)
- **Storage**: IPFS
- **Package Manager**: pnpm (Monorepo)

## 프로젝트 구조 

iLoveCertLab/
├── package.json
├── pnpm-workspace.yaml
└── packages/
    ├── frontend/         # React 프론트엔드 애플리케이션
    ├── contracts/        # Solidity 스마트 컨트랙트
    └── backend/          # Express 백엔드 서버

## 시작하기

### 사전 요구사항

- Node.js 16.x 이상
- pnpm 7.x 이상
- MetaMask 또는 기타 Web3 지갑
- Sepolia 테스트넷 ETH (테스트넷 배포 시)

### 설치

1. 저장소 클론
```bash
git clone https://github.com/yourusername/iLoveCertLab.git
cd iLoveCertLab
```

2. 의존성 설치
```bash
pnpm install
```

3. 환경 변수 설정
각 패키지의 .env 파일을 설정합니다.

contracts/.env:
```plaintext
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=your_sepolia_rpc_url_here
```

### 개발 환경 실행

1. 스마트 컨트랙트 배포
로컬 네트워크에 배포:
```bash
pnpm deploy-contracts
```

테스트넷(Sepolia)에 배포:
```bash
pnpm deploy-contracts:sepolia
```

2. 프론트엔드 실행
```bash
pnpm --filter frontend run start
```

3. 백엔드 서버 실행
```bash
pnpm --filter backend run start
```

## 주요 기능

- 디지털 인증서 생성 및 PDF 발급
- IPFS를 통한 인증서 저장
- 블록체인 기반 인증서 검증
- 인증서 발급 이력 조회

## 환경 변수 설정

각 패키지별로 필요한 환경 변수를 설정해야 합니다.

### Backend (.env)
```
RPC_URL=your_ethereum_rpc_url
CONTRACT_ADDRESS=deployed_contract_address
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:3000
REACT_APP_CONTRACT_ADDRESS=deployed_contract_address
```

## 테스트

```bash
# 모든 패키지 테스트 실행
pnpm test

# 스마트 컨트랙트만 테스트
pnpm test:contracts

# 프론트엔드 테스트
pnpm --filter frontend run test
```

## 배포

1. 스마트 컨트랙트 배포
로컬 네트워크에 배포:
```bash
pnpm deploy-contracts
```

Sepolia 테스트넷에 배포:
```bash
pnpm deploy-contracts:sepolia
```

2. 프론트엔드 빌드
```bash
pnpm --filter frontend run build
```

## 라이선스

ISC

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 연락처

프로젝트 관리자 - [@your_twitter](https://twitter.com/your_twitter)

프로젝트 링크: [https://github.com/yourusername/iLoveCertLab](https://github.com/yourusername/iLoveCertLab)