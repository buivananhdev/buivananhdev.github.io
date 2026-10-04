import Link from 'next/link';
import { TOOL_REGISTRY } from '@/config/tools-registry';

export default function ToolsIndexPage() {
  return (
    <main className="page-shell narrow">
      <section className="section-block">
        <h1>Tất cả công cụ</h1>
        <ul className="link-list">
          {TOOL_REGISTRY.map((tool) => (
            <li key={tool.id}>
              <Link href={`/tools/${tool.category}/${tool.slug}`}>
                {tool.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
