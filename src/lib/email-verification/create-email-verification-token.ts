import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";

export async function createEmailVerificationToken(email: string): Promise<string> {
  const token = uuidv4();
  const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  // Delete any existing token for this email
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  // Store new token in the database
  await prisma.verificationToken.create({ data: { identifier: email, token, expires } });
  return token;
}
