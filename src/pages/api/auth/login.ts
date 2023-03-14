// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/functions/prisma";
import { login } from "@/functions/auth";

type Data = {
  message: string;
  token: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  console.log(req.body.email, req.body.password)
  const token = await login(req.body.email, req.body.password);
  if (token) {
    res.status(200).json({ message: "User has been signed in.", token: token });
  } else {
    res
      .status(400)
      .json({ message: "User has not been signed in.", token: null });
  } 
}
