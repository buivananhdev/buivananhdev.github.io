export type ToolCategory = 'it' | 'automation' | 'ai';

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  category: ToolCategory;
  seoKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  status: 'live' | 'coming-soon';
}
