'use client';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { BlobProvider } from '@react-pdf/renderer';

interface SimpleCertificateFrameProps {
  document: React.ReactElement;
}

export default function SimpleCertificateFrame({
  document,
}: SimpleCertificateFrameProps) {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <BlobProvider document={document}>
        {({ url }) => (
          <Document
            file={url}
            loading={loading}
            onLoadSuccess={() => setLoading(false)}
          >
            <Page
              pageNumber={1}
              width={containerRef.current?.clientWidth}
            />
          </Document>
        )}
      </BlobProvider>
    </div>
  );
} 