import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const { key } = req.query;
        
        if (!key || typeof key !== 'string') {
          return res.status(400).json({ error: 'Key is required' });
        }

        const value = await redis.get(key);
        
        if (value === null) {
          return res.status(404).json({ error: 'Key not found' });
        }

        return res.status(200).json({ key, value });
      }

      case 'POST': {
        const { key, value } = req.body;

        if (!key || typeof key !== 'string') {
          return res.status(400).json({ error: 'Key is required' });
        }

        if (value === undefined) {
          return res.status(400).json({ error: 'Value is required' });
        }

        await redis.set(key, value);

        return res.status(200).json({ key, value });
      }

      case 'DELETE': {
        const { key } = req.query;

        if (!key || typeof key !== 'string') {
          return res.status(400).json({ error: 'Key is required' });
        }

        await redis.del(key);

        return res.status(200).json({ key, deleted: true });
      }

      case 'PUT': {
        // List keys with optional prefix
        const { prefix } = req.query;
        
        let keys: string[];
        
        if (prefix && typeof prefix === 'string') {
          keys = await redis.keys(`${prefix}*`);
        } else {
          keys = await redis.keys('*');
        }

        return res.status(200).json({ keys, prefix: prefix || null });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
        return res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('Redis API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}