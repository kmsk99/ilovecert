import { NextResponse, NextRequest } from 'next/server';

import { pinata } from '@/utils/config';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const uploadData = await pinata.upload.file(file);
    return NextResponse.json(uploadData.IpfsHash, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
