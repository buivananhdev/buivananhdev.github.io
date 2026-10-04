import { TOOL_REGISTRY } from '@/config/tools-registry';
import { notFound } from 'next/navigation';
import { ToolPageShell } from '@/components/ToolPageShell';
import { ModbusCRCTool } from '@/components/ModbusCRC/ModbusCRCTool';

export function generateStaticParams() {
  return TOOL_REGISTRY.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export default function ToolRoutePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const tool = TOOL_REGISTRY.find(
    (entry) => entry.category === params.category && entry.slug === params.slug,
  );

  if (!tool) {
    notFound();
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'modbus-crc':
        return <ModbusCRCTool />;
      default:
        return <div className="coming-soon">Công cụ đang được xây dựng.</div>;
    }
  };

  return (
    <ToolPageShell tool={tool}>
      {renderToolComponent()}
    </ToolPageShell>
  );
}
