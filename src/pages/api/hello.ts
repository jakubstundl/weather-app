// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  x1: string|string[];
  x2: string|string[];
  x3: string|string[];
  x4: string|string[];
  
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const x1 = req.headers["x-forwarded-for"]||"no data";
  const x2 = req.headers["x-vercel-ip-country"]||"no data";
  const x3 = req.headers["x-vercel-ip-country-region"]||"no data";
  const x4 = req.headers["x-vercel-ip-city"]||"no data";

  
  
  res.status(200).json({ x1,x2,x3,x4})
}
