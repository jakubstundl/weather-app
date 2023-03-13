// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@/functions/prisma";
import { City_db } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  cities: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.q) {
    const q: string = req.query.q as string;
    const db = await prisma.city_db.findMany({
      where: { owm_city_name: { startsWith: q } },
      take: 20,
      orderBy: {
        owm_city_name: "asc",
      },
    });
    let result: string[] = [];
    db.forEach((city: City_db) => {
      return result.push(`${city.owm_city_name},${city.country_short}`);
    });
    res.status(200).json({ cities: [...new Set(result)] });
  }
}
