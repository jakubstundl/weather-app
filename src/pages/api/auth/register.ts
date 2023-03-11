// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/functions/prisma";
import { hashPassword } from "@/functions/auth";
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let userCreated:boolean = false;
  let message: string = "Default";
  try {
    await prisma.user.create({
      data: {
        email: req.body.name,
        password: hashPassword(req.body.password)
      },
    });
    userCreated = true;
    message = "User has been created";
  } catch (error) {
    message = "There has been an error while creating the user.";
  }

  if (userCreated) {
    console.log(message)
    res.status(201).json({ message: message });
  } else {
    res.status(400).json({ message: message });
  }
}
