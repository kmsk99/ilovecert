export function NetworkErrorAlert() {
  return (
    <div className='alert alert-warning'>
      네트워크 오류가 발생했습니다. 다음 단계를 시도해보세요: 1. MetaMask
      설정에서 &apos;계정 초기화&apos; 실행 2. 페이지 새로고침 3. 다른
      네트워크로 전환했다가 다시 돌아오기
    </div>
  );
}
