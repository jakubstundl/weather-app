import { prisma } from "./prisma";
import * as crypto from "crypto";
import jwt from "jsonwebtoken";
import { isUser } from "../predicates";
import { User } from "@prisma/client";

export const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const user: User | null = await prisma.user.findUnique({
    where: { email: email },
  });

  if (isUser(user) && hashPassword(password) === user.password) {
    return await accessToken(email, user.id);
  }
  return null;
};

export const hashPassword = (password: string): string => {
  return crypto.createHash("sha512").update(password).digest("hex");
};

export const accessToken = async (
  email: string,
  userId: string
): Promise<string | null> => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (typeof secret == "string") {
    return jwt.sign({ email: email, userId: userId }, secret, {
      expiresIn: "8d",
    });
  } else {
    return null;
  }
};

export const getEmailFromToken = (token: string): string | null => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (typeof secret === "string") {
    try {
      const t = jwt.verify(token, secret) as { email: string };
      return t.email;
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const getUserIdFromToken = (token: string): string | null => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (typeof secret === "string") {
    try {
      const t = jwt.verify(token, secret) as { userId: string };
      return t.userId;
    } catch (error) {
      return null;
    }
  }
  return null;
};


