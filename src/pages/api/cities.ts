// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getUserIdFromToken } from "@/functions/auth";
import { prisma } from "@/functions/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  cities?: (string | null)[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET" && req.cookies.accessToken) {
    const userId = getUserIdFromToken(req.cookies.accessToken);
    if (userId) {
      const cities = (
        await prisma.city.findMany({ where: { userId: userId } })
      ).map((city) => city.name);
      res.status(200).json({ cities: cities });
    }
  }

  if (req.method == "POST" && req.cookies.accessToken && req.body.name) {
    const userId = getUserIdFromToken(req.cookies.accessToken);
    if (userId) {
      await prisma.city.create({
        data: { userId: userId, name: req.body.name },
      });
      res.status(200).json({ message: "City has been added." });
    }
  }

  if (req.method == "DELETE" && req.cookies.accessToken && req.body.name) {
    const userId = getUserIdFromToken(req.cookies.accessToken);
    if (userId) {
      await prisma.city.deleteMany({
        where: { userId: userId, name: req.body.name },
      });
      res.status(200).json({ message: "City has been deleted." });
    }
  }
}
