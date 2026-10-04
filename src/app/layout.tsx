import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevTools Hub | IT, Automation, AI Tools',
  description: 'Hệ sinh thái công cụ kỹ thuật online cho IT, tự động hóa và AI, chạy 100% ở trình duyệt.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
