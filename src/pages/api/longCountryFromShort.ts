// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../functions/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  country: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.country_short && req.query.city) {
    const country: string = req.query.country_short as string;
    const city: string = req.query.city as string;

    const db = await prisma.city_db.findMany({
      where: { owm_city_name: city, country_short: country },
      take: 1,
    });
    let result: string = db[0].country_long || "";

    res.status(200).json({ country: result });
  }
}
