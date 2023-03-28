// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/functions/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  x0: string | string[];
  x1: string | string[];
  x2: string | string[];
  x3: string | string[];
  x4: string | string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const x0 = "Hello";
  const x1 = req.headers["x-forwarded-for"] || "no data";
  const x2 = req.headers["x-vercel-ip-country"] || "no data";
  const x3 = req.headers["x-vercel-ip-country-region"] || "no data";
  const x4 = req.headers["x-vercel-ip-city"] || "no data";

  await prisma.clientData.create({
    data: { data: JSON.stringify({ x0, x1, x2, x3, x4 }) },
  });

  // res.status(200).json({ x0,x1,x2,x3,x4})
}
