import Link from 'next/link';

const tools = [
  {
    id: 'modbus-crc',
    title: 'Modbus RTU CRC-16 Calculator',
    description: 'Tính toán mã CRC-16 cho dữ liệu Modbus RTU một cách chính xác và nhanh chóng.',
    category: 'automation',
    href: '/tools/modbus-crc',
  },
  {
    id: 'json-ts',
    title: 'JSON to TypeScript Interface',
    description: 'Chuyển đổi JSON sang TypeScript Interface tự động với hỗ trợ cấu trúc lồng nhau.',
    category: 'it',
    href: '#',
  },
  {
    id: 'jwt-debugger',
    title: 'JWT Safe Debugger',
    description: 'Giải mã JWT an toàn mà không cần gửi dữ liệu lên server.',
    category: 'it',
    href: '#',
  },
  {
    id: 'token-counter',
    title: 'LLM Prompt Token Counter',
    description: 'Đếm token prompt cho các mô hình AI như GPT, Claude, Llama.',
    category: 'ai',
    href: '#',
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="/" className="brand">
            <span className="brand-mark">D</span>
            <span>DevTools Hub</span>
          </a>
          <nav className="nav">
            <a href="#">Trang chủ</a>
            <a href="#">Công cụ</a>
            <a href="#">Tài liệu</a>
          </nav>
        </div>
      </header>

      <main className="container page-content">
        <section className="hero">
          <div className="hero-kicker">⚡ Developer Tooling Ecosystem</div>
          <h1>DevTools Hub cho IT, Automation & AI</h1>
          <p>
            Hệ sinh thái công cụ kỹ thuật online chạy hoàn toàn ở trình duyệt. Từ tính toán CRC cho PLC, chuyển đổi JSON sang TypeScript, đến đếm token AI — tất cả đều nhanh, an toàn và không cần backend.
          </p>
          <div className="hero-actions">
            <Link href="/tools/modbus-crc" className="btn btn-primary">
              Dùng Ngay
            </Link>
            <a href="#tools" className="btn btn-secondary">
              Xem Công Cụ
            </a>
          </div>
        </section>

        <section id="tools">
          <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Công Cụ Nổi Bật</h2>
          <div className="tools-grid">
            {tools.map((tool) => (
              <a key={tool.id} href={tool.href} className="tool-card">
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#7a88a8' }}>
                  {tool.category.toUpperCase()}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 DevTools Hub | Công cụ kỹ thuật cho lập trình, tự động hóa và AI</p>
        </div>
      </footer>
    </>
  );
}
