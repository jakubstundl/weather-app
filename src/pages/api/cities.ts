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

  if (req.method == "POST" && req.cookies.accessToken && req.body.city) {
    console.log("here");

    const userId = getUserIdFromToken(req.cookies.accessToken);
    if (userId) {
try {
  await prisma.city.create({
    data: { userId: userId, name: req.body.city },
  });
  res.status(200).json({ message: "City has been added." });
} catch (error) {
  res.status(400).json({ message: "City is already in your list." });

}
      

    }
  }

  if (req.method == "DELETE" && req.cookies.accessToken && req.body.city) {
    console.log("here");
    
    const userId = getUserIdFromToken(req.cookies.accessToken);
    if (userId) {
      await prisma.city.deleteMany({
        where: { userId: userId, name: req.body.city },
      });
      res.status(200).json({ message: "City has been deleted." });
    }
  }
}
