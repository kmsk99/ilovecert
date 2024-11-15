# iLoveCert (블록체인 인증서 발급 시스템)

블록체인 기반의 디지털 인증서 발급 및 검증 시스템입니다.

## 기술 스택

- **Frontend**: Next.js 14, React 18, TailwindCSS, wagmi v2, viem
- **Blockchain**: Ethereum (Hardhat)
- **Storage**: IPFS (Pinata)
- **Package Manager**: pnpm (Monorepo)

## 시작하기

### 사전 요구사항

- Node.js 16.x 이상
- pnpm 7.x 이상
- MetaMask 지갑

### 설치 및 실행

1. 저장소 클론 및 의존성 설치
```bash
git clone https://github.com/yourusername/iLoveCert.git
cd iLoveCert
pnpm install
```

2. 환경 변수 설정

frontend/.env.local:
```plaintext
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_RPC_URL=http://127.0.0.1:8545
PINATA_JWT=your_pinata_jwt
NEXT_PUBLIC_GATEWAY_URL=your_pinata_gateway_url
```

3. 개발 환경 실행

단일 명령어로 실행:
```bash
pnpm start:dev
```

또는 개별적으로 실행:
```bash
# Hardhat 노드 실행
pnpm node

# 컨트랙트 배포
pnpm deploy-contracts

# 프론트엔드 실행
pnpm dev
```

4. MetaMask 설정
- MetaMask 초기화:
  1. MetaMask 설정(Settings) > 고급(Advanced) > 계정 초기화(Reset Account) 클릭
  2. MetaMask 설정 > 네트워크 > Localhost 8545 삭제 (이미 있는 경우)

- Hardhat의 첫 번째 계정(Account #0) 가져오기:
  1. MetaMask에서 계정 가져오기(Import Account) 클릭
  2. 개인키 입력: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

- Localhost 8545 네트워크 추가:
  1. 네트워크 추가(Add Network) 클릭
  2. 수동으로 추가:
     - 네트워크 이름: Localhost 8545
     - RPC URL: http://127.0.0.1:8545
     - 체인 ID: 31337
     - 통화 기호: ETH

5. 개발 환경 실행
```bash
# 1. 모든 프로세스 종료 및 초기화
pnpm clean

# 2. Hardhat 노드 초기화
pnpm reset-node

# 3. 전체 개발 환경 실행
pnpm start:dev
```

## 주요 기능

### 관리자 기능
- 발급자 권한 관리
  - 발급자 추가/제거
  - 발급자 목록 조회

### 발급자 기능
- 인증서 발급
  - 수령인 정보 입력
  - 인증서 디자인 커스터마이징
  - 로고 업로드
  - 메타데이터 IPFS 저장
  - 블록체인 기록

### 검증 기능
- 인증서 유효성 검증
- 발급자 확인
- 메타데이터 조회

## 프로젝트 구조

```
iLoveCert/
├── packages/
│   ├── frontend/          # Next.js 14 프론트엔드
│   │   ├── src/
│   │   │   ├── app/      # 페이지 컴포넌트
│   │   │   ├── components/# UI 컴포넌트
│   │   │   └── hooks/    # 커스텀 훅
│   │   └── ...
│   └── contracts/        # Solidity 컨트랙트
│       ├── contracts/    # 스마트 컨트랙트
│       ├── scripts/      # 배포 스크립트
│       └── test/         # 테스트 파일
```

## 테스트

```bash
# 모든 패키지 테스트
pnpm test

# 스마트 컨트랙트만 테스트
pnpm test:contracts
```

## 배포 (테스트넷)

```bash
# Sepolia 테스트넷 배포
pnpm deploy-contracts:sepolia

# Mumbai 테스트넷 배포
pnpm deploy-contracts:mumbai
```

## 라이선스

ISC