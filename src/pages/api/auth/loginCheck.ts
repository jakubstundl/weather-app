// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/functions/prisma";
import { getEmailFromToken, login } from "@/functions/auth";

type Data = {
  email: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = req.cookies.accessToken;
  if (token) {
    const email = getEmailFromToken(token);
    res.status(200).json({ email: email });
  } else {
    res.status(200).json({ email: null });
  }
}
