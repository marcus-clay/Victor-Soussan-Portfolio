// Vercel Serverless Function - Notion API Proxy
// This keeps the Notion API token secure on the server

import type { VercelRequest, VercelResponse } from '@vercel/node';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_API_VERSION = '2022-06-28';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for API key
  if (!NOTION_API_KEY) {
    return res.status(500).json({ error: 'Notion API key not configured' });
  }

  const { endpoint, pageId, blockId } = req.query;

  try {
    let url: string;

    if (endpoint === 'page' && pageId) {
      // Fetch page metadata
      url = `https://api.notion.com/v1/pages/${pageId}`;
    } else if (endpoint === 'blocks' && blockId) {
      // Fetch block children
      url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100`;
    } else {
      return res.status(400).json({ error: 'Invalid endpoint or missing parameters' });
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_API_VERSION,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({
        error: 'Notion API error',
        details: errorData
      });
    }

    const data = await response.json();

    // Set cache headers (5 minutes)
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Notion API proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
