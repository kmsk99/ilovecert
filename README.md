# iLoveCert (아이러브클럽 인증서 발급 시스템)

블록체인 기반의 디지털 인증서 발급 및 검증 시스템입니다.

## 기술 스택

- **Frontend**: Next.js 14, React 18, TailwindCSS, wagmi, viem
- **Backend**: Express.js, TypeScript, ethers
- **Blockchain**: Ethereum (Hardhat)
- **Package Manager**: pnpm (Monorepo)

## 시작하기

### 사전 요구사항

- Node.js 16.x 이상
- pnpm 7.x 이상
- MetaMask 지갑

### 설치 및 실행

1. 저장소 클론 및 의존성 설치
```bash
git clone https://github.com/yourusername/iLoveCertLab.git
cd iLoveCertLab
pnpm install
```

2. 환경 변수 설정

contracts/.env:
```plaintext
PRIVATE_KEY=your_private_key_here
SEPOLIA_URL=your_sepolia_rpc_url_here
```

backend/.env:
```plaintext
PORT=3001
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

frontend/.env.local:
```plaintext
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

3. 개발 환경 실행

터미널 1 - Hardhat 노드:
```bash
cd packages/contracts
npx hardhat node
```

터미널 2 - 컨트랙트 배포:
```bash
cd packages/contracts
npx hardhat run scripts/deploy.js --network localhost
```

터미널 3 - 백엔드:
```bash
cd packages/backend
pnpm dev
```

터미널 4 - 프론트엔드:
```bash
cd packages/frontend
pnpm dev
```

## 프로젝트 구조

```
iLoveCertLab/
├── packages/
│   ├── frontend/          # Next.js 14 프론트엔드
│   │   ├── src/
│   │   │   ├── app/      # 페이지 컴포넌트
│   │   │   ├── components/# UI 컴포넌트
│   │   │   └── hooks/    # 커스텀 훅
│   │   └── ...
│   ├── backend/          # Express 백엔드
│   │   ├── src/
│   │   │   ├── index.ts  # 메인 서버
│   │   │   ├── contract.ts# 컨트랙트 ABI
│   │   │   └── types.ts  # 타입 정의
│   │   └── ...
│   └── contracts/        # Solidity 컨트랙트
│       ├── contracts/    # 스마트 컨트랙트
│       ├── scripts/      # 배포 스크립트
│       └── test/         # 테스트 파일
└── ...
```

## API 엔드포인트

### 백엔드 API

- `GET /api/certificates/:address` - 주소별 인증서 목록 조회
- `GET /api/certificate/:id` - 단일 인증서 조회

## 테스트

```bash
# 스마트 컨트랙트 테스트
cd packages/contracts
npx hardhat test
```

## 배포 (테스트넷)

```bash
# 컨트랙트 배포 (Sepolia)
cd packages/contracts
npx hardhat run scripts/deploy.js --network sepolia
```

## 라이선스

ISC