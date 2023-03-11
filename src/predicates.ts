import { User } from "@prisma/client";
import type { Secret } from "jsonwebtoken";

export const isInput = (element: any): element is HTMLInputElement => {
  return element instanceof HTMLInputElement;
};

export const isForm = (element: any): element is HTMLFormElement => {
  return element instanceof HTMLFormElement;
};

export const isSecret = (secret: any): secret is Secret => {
  if (secret.type) {
    return true;
  }
  return false;
};
 export const isUser = (user:any): user is User =>{
  return typeof user.email=="string";
 }