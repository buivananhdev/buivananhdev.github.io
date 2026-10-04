import Link from 'next/link';
import { TOOL_REGISTRY } from '@/config/tools-registry';
import { ToolCard } from '@/components/ToolCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const groupedTools = {
    automation: TOOL_REGISTRY.filter((tool) => tool.category === 'automation'),
    it: TOOL_REGISTRY.filter((tool) => tool.category === 'it'),
    ai: TOOL_REGISTRY.filter((tool) => tool.category === 'ai'),
  };

  return (
    <>
      <Header />

      <main className="page-shell">
        <section className="hero">
          <div className="kicker">Developer Tooling Ecosystem</div>
          <h1>DevTools Hub cho IT, Automation và AI</h1>
          <p>
            Hệ sinh thái các công cụ kỹ thuật online chạy hoàn toàn ở trình duyệt, phục vụ
            lập trình, PLC, hệ thống tự động hóa, xử lý dữ liệu và AI prompt engineering.
          </p>
          <div className="hero-actions">
            <Link href="#tools" className="primary-button">
              Xem công cụ
            </Link>
            <Link href="/tools/automation/modbus-crc-calculator" className="secondary-button">
              Dùng ngay
            </Link>
          </div>
        </section>

        <section id="tools" className="tool-groups">
          {Object.entries(groupedTools).map(([category, tools]) => (
            <div key={category} className="tool-group">
              <div className="group-header">
                <span className="group-badge">{category.toUpperCase()}</span>
                <h2>
                  {category === 'automation' && 'Automation'}
                  {category === 'it' && 'IT'}
                  {category === 'ai' && 'AI'}
                </h2>
              </div>

              <div className="tool-grid">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
