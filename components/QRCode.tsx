'use client';

import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download } from 'lucide-react';

interface QRCodeProps {
  value: string;
  size?: number;
  includeLogo?: boolean;
}

export default function QRCodeComponent({ value, size = 256, includeLogo = false }: QRCodeProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = size;
        canvas.height = size;
        ctx?.drawImage(img, 0, 0);
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `birthday-card-qr-${Date.now()}.png`;
        link.click();
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div ref={qrRef} className="bg-white p-4 rounded-2xl shadow-lg">
        <QRCodeSVG
          value={value}
          size={size}
          level="H"
          includeMargin={false}
          imageSettings={
            includeLogo
              ? {
                  src: '/logo.png',
                  height: 48,
                  width: 48,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>
      <button
        onClick={downloadQRCode}
        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
        Download QR Code
      </button>
    </div>
  );
}
