// Notion API Service for fetching and rendering Notion pages
// Uses Vercel serverless function as proxy to keep API key secure

export interface NotionBlock {
  id: string;
  type: string;
  has_children: boolean;
  [key: string]: any;
}

export interface NotionPage {
  id: string;
  title: string;
  icon?: string;
  cover?: string;
  blocks: NotionBlock[];
}

export interface RichText {
  type: string;
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

// Extract plain text from rich_text array
export function extractPlainText(richText: RichText[]): string {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map(rt => rt.plain_text).join('');
}

// API endpoint - always use serverless function
// In production: Vercel serverless
// In development: requires `vercel dev` or configure vite proxy
const API_BASE = '/api/notion';

// Fetch page metadata
async function fetchPageMetadata(pageId: string): Promise<any> {
  const response = await fetch(`${API_BASE}?endpoint=page&pageId=${pageId}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to fetch page: ${response.status} - ${JSON.stringify(error)}`);
  }
  return response.json();
}

// Fetch blocks for a page or block
async function fetchBlocks(blockId: string): Promise<NotionBlock[]> {
  const response = await fetch(`${API_BASE}?endpoint=blocks&blockId=${blockId}`);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Failed to fetch blocks: ${response.status} - ${JSON.stringify(error)}`);
  }
  const data = await response.json();
  return data.results;
}

// Recursively fetch all blocks including children
async function fetchAllBlocks(blockId: string, depth: number = 0): Promise<NotionBlock[]> {
  if (depth > 5) return []; // Prevent infinite recursion

  const blocks = await fetchBlocks(blockId);
  const blocksWithChildren: NotionBlock[] = [];

  for (const block of blocks) {
    if (block.has_children) {
      const children = await fetchAllBlocks(block.id, depth + 1);
      blocksWithChildren.push({ ...block, children });
    } else {
      blocksWithChildren.push(block);
    }
  }

  return blocksWithChildren;
}

// Main function to fetch a complete Notion page
export async function fetchNotionPage(pageId: string): Promise<NotionPage> {
  try {
    const [metadata, blocks] = await Promise.all([
      fetchPageMetadata(pageId),
      fetchAllBlocks(pageId),
    ]);

    // Extract title from properties
    const titleProperty = metadata.properties?.title;
    const title = titleProperty?.title?.[0]?.plain_text || 'Untitled';

    // Extract icon if present
    let icon: string | undefined;
    if (metadata.icon?.type === 'emoji') {
      icon = metadata.icon.emoji;
    } else if (metadata.icon?.type === 'file') {
      icon = metadata.icon.file.url;
    }

    // Extract cover if present
    let cover: string | undefined;
    if (metadata.cover?.type === 'file') {
      cover = metadata.cover.file.url;
    } else if (metadata.cover?.type === 'external') {
      cover = metadata.cover.external.url;
    }

    return {
      id: pageId,
      title,
      icon,
      cover,
      blocks,
    };
  } catch (error) {
    console.error('Error fetching Notion page:', error);
    throw error;
  }
}

// Cache for Notion pages
const pageCache: Map<string, { page: NotionPage; timestamp: number }> = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchNotionPageWithCache(pageId: string): Promise<NotionPage> {
  const cached = pageCache.get(pageId);
  const now = Date.now();

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.page;
  }

  const page = await fetchNotionPage(pageId);
  pageCache.set(pageId, { page, timestamp: now });

  return page;
}

// Clear cache for a specific page
export function clearPageCache(pageId: string): void {
  pageCache.delete(pageId);
}

// Page IDs for easy reference
export const NOTION_PAGES = {
  TOOLKIT: '2b7a519b0dea80d9b40cc730ce4cfc4b',
};
