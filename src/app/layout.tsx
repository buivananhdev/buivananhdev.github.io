import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://buivananhdev.github.io'),
  title: {
    default: 'DevTools Hub | IT, Automation, AI Tools',
    template: '%s | DevTools Hub',
  },
  description:
    'Hệ sinh thái công cụ kỹ thuật online cho IT, tự động hóa và AI, chạy hoàn toàn ở browser với chiến lược SEO và hiệu suất tối ưu.',
  alternates: {
    canonical: 'https://buivananhdev.github.io',
  },
  openGraph: {
    title: 'DevTools Hub',
    description:
      'Công cụ trực tuyến cho IT, Automation và AI, chạy 100% ở trình duyệt.',
    url: 'https://buivananhdev.github.io',
    siteName: 'DevTools Hub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTools Hub',
    description:
      'Hệ sinh thái công cụ kỹ thuật online cho IT, Automation và AI.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
