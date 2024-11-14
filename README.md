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


## TODO List

### 1. 스마트 컨트랙트 개발
- [ ] 인증서 발급 기능
  - [ ] 인증서 메타데이터 구조 정의
  - [ ] 발급자 권한 관리 시스템
  - [ ] 인증서 유효성 검증 로직
  - [ ] 인증서 취소 기능
- [ ] 인증서 조회 기능
  - [ ] 단일 인증서 조회
  - [ ] 사용자별 인증서 목록 조회
  - [ ] 발급자별 발급 인증서 목록 조회
- [ ] 접근 제어
  - [ ] 관리자 역할 정의
  - [ ] 발급자 역할 정의
  - [ ] 권한 위임 시스템

### 2. 백엔드 개발
- [ ] API 엔드포인트 구현
  - [ ] 인증서 발급 요청 처리
  - [ ] 인증서 조회 API
  - [ ] 인증서 검증 API
- [ ] IPFS 통합
  - [ ] 인증서 이미지 저장
  - [ ] 메타데이터 저장
  - [ ] 파일 검색 및 조회
- [ ] 인증 시스템
  - [ ] JWT 토큰 기반 인증
  - [ ] 지갑 서명 검증
- [ ] 데이터베이스 설계
  - [ ] 인증서 메타데이터 캐싱
  - [ ] 사용자 정보 관리
  - [ ] 발급 이력 관리

### 3. 프론트엔드 개발
- [ ] 인증서 발급 페이지
  - [ ] 인증서 템플릿 선택 기능
  - [ ] 메타데이터 입력 폼
  - [ ] 이미지 업로드 및 미리보기
  - [ ] 발급 진행 상태 표시
- [ ] 인증서 조회 페이지
  - [ ] 인증서 목록 필터링
  - [ ] 정렬 기능
  - [ ] 검색 기능
  - [ ] 페이지네이션
- [ ] 인증서 상세 페이지
  - [ ] 메타데이터 표시
  - [ ] PDF 다운로드
  - [ ] 공유 기능
  - [ ] 블록체인 검증 상태 표시
- [ ] 지갑 연동
  - [ ] 다중 지갑 지원
  - [ ] 서명 요청 처리
  - [ ] 네트워크 전환 처리

### 4. 인증서 디자인 시스템
- [ ] 템플릿 시스템
  - [ ] 기본 템플릿 제작
  - [ ] 커스텀 템플릿 생성 기능
  - [ ] 템플릿 미리보기
- [ ] 디자인 요소
  - [ ] 폰트 관리
  - [ ] 색상 테마
  - [ ] 로고 배치
  - [ ] QR코드 생성

### 5. 보안
- [ ] 스마트 컨트랙트 감사
  - [ ] 코드 감사
  - [ ] 취약점 분석
- [ ] 프론트엔드 보안
  - [ ] 입력값 검증
  - [ ] XSS 방지
  - [ ] CSRF 방지
- [ ] 백엔드 보안
  - [ ] Rate limiting
  - [ ] API 키 관리
  - [ ] 로깅 시스템

### 6. 테스트
- [ ] 스마트 컨트랙트 테스트
  - [ ] 단위 테스트
  - [ ] 통합 테스트
  - [ ] 가스 최적화 테스트
- [ ] 백엔드 테스트
  - [ ] API 엔드포인트 테스트
  - [ ] 부하 테스트
- [ ] 프론트엔드 테스트
  - [ ] 컴포넌트 테스트
  - [ ] E2E 테스트
  - [ ] 크로스 브라우저 테스트

### 7. 배포
- [ ] 스마트 컨트랙트 배포
  - [ ] 테스트넷 배포
  - [ ] 메인넷 배포
  - [ ] 컨트랙트 검증
- [ ] 인프라 구축
  - [ ] CI/CD 파이프라인
  - [ ] 모니터링 시스템
  - [ ] 백업 시스템
- [ ] 문서화
  - [ ] API 문서
  - [ ] 사용자 가이드
  - [ ] 개발자 문서

### 8. 유지보수
- [ ] 성능 모니터링
  - [ ] 응답 시간 측정
  - [ ] 리소스 사용량 추적
- [ ] 버그 추적
  - [ ] 에러 로깅
  - [ ] 사용자 피드백 수집
- [ ] 업데이트 계획
  - [ ] 기능 개선 로드맵
  - [ ] 보안 패치 계획

## 라이선스

ISC