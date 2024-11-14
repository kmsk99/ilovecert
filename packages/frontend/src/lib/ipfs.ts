export async function uploadToIPFS(file: Blob): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/files', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('파일 업로드에 실패했습니다.');
    }

    const ipfsHash = await response.json();
    if (!ipfsHash) {
      throw new Error('IPFS 해시를 받지 못했습니다.');
    }

    return ipfsHash;
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    throw new Error('파일 업로드에 실패했습니다.');
  }
}
