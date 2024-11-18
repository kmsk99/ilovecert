# iLoveCert (블록체인 인증서 발급 시스템)

블록체인 기반의 디지털 인증서 발급 및 검증 시스템입니다. 교육 수료증, 자격증 등 다양한 인증서를 블록체인에 안전하게 발급하고 검증할 수 있습니다.

## 주요 기능

### 인증서 발급
- 커스터마이징 가능한 인증서 템플릿
- 발급자 로고 및 서명 이미지 업로드
- IPFS를 통한 메타데이터 영구 저장
- 블록체인 기반 발급 이력 관리

### 인증서 검증
- 블록체인 기반 진위여부 검증
- 발급자 정보 확인
- 메타데이터 조회

### 권한 관리
- 관리자: 발급자 권한 부여/회수
- 발급자: 인증서 발급 권한
- 일반 사용자: 인증서 조회 및 검증

## 기술 스택

### Frontend
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- wagmi v2 & viem (블록체인 연동)
- React Hook Form (폼 관리)

### Blockchain
- Ethereum (Hardhat)
- Solidity ^0.8.20
- OpenZeppelin Contracts

### Storage
- IPFS (Pinata)
- Pinata SDK

### 개발 환경
- TypeScript
- pnpm (Monorepo)
- ESLint & Prettier

## 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- pnpm 8.x 이상
- MetaMask 지갑

### 설치

```bash
git clone https://github.com/kmsk99/ilovecert.git
cd iLoveCert
pnpm install
```

### 환경 변수 설정

frontend/.env.local:
```plaintext
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_pinata_gateway_url
```

contracts/.env:
```plaintext
PRIVATE_KEY=your_private_key
SEPOLIA_URL=your_sepolia_url
```

### 개발 환경 실행

```bash
# 전체 개발 환경 실행
pnpm start:dev

# 또는 개별 실행
pnpm node          # Hardhat 노드
pnpm deploy        # 컨트랙트 배포
pnpm dev           # 프론트엔드
```

### MetaMask 설정

1. 개발 네트워크 추가
   - 네트워크 이름: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - 체인 ID: 31337
   - 통화 기호: ETH

2. 테스트 계정 가져오기
   - 개인키: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

## 프로젝트 구조

```
iLoveCert/
├── packages/
│   ├── frontend/                 # Next.js 프론트엔드
│   │   ├── src/
│   │   │   ├── app/             # 페이지 컴포넌트
│   │   │   ├── components/      # UI 컴포넌트
│   │   │   ├── hooks/          # 커스텀 훅
│   │   │   ├── types/          # TypeScript 타입
│   │   │   └── config/         # 설정 파일
│   │   └── public/             # 정적 파일
│   └── contracts/              # Solidity 스마트 컨트랙트
│       ├── contracts/          # 컨트랙트 소스
│       ├── scripts/            # 배포 스크립트
│       └── test/              # 테스트 파일
```

## 테스트

```bash
# 전체 테스트
pnpm test

# 컨트랙트 테스트
pnpm test:contracts

# 프론트엔드 테스트
pnpm test:frontend
```

## 배포

### 테스트넷 배포

```bash
# Sepolia 테스트넷
pnpm deploy:sepolia

# Mumbai 테스트넷
pnpm deploy:mumbai
```

### 프론트엔드 배포

```bash
pnpm build
pnpm start
```

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

MIT

## 문의

프로젝트에 대한 문의사항이나 버그 리포트는 GitHub Issues를 이용해 주세요.