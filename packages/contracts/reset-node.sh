#!/bin/bash
# 기존 하드햇 프로세스 종료
pkill -f "hardhat node"

# 캐시 삭제
rm -rf cache
rm -rf artifacts

# 노드 재시작
npx hardhat node --hostname 0.0.0.0 