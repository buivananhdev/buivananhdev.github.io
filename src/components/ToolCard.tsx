import Link from 'next/link';
import type { ToolItem } from '@/lib/types/tool';

export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <Link href={`/tools/${tool.category}/${tool.slug}`} className="tool-card link-card">
      <div className="tool-card-header">
        <span className="tool-tag">{tool.category}</span>
        <span className={`status ${tool.status}`}>{tool.status === 'live' ? 'Live' : 'Coming Soon'}</span>
      </div>
      <h3>{tool.title}</h3>
      <p>{tool.description}</p>
    </Link>
  );
}
