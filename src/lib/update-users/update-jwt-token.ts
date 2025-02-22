import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import prisma from "../prisma";

/**
 * Update JWT token with user data from database.
 * @param {JWT} token - The current JWT token.
 * @param {User | AdapterUser} user - The authenticated user.
 * @param {Account | null} account - The account used for authentication.
 * @returns {Promise<JWT>} - The updated JWT token.
 */
const updateJwtToken = async (token: JWT, user: User | AdapterUser, account: Account | null): Promise<JWT> => {
  if (user && account) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { createdAt: true, updatedAt: true, emailVerified: true },
    });
    if (!dbUser) return token;

    token = {
      sub: token.sub,
      email: token.email,
      name: token.name,
      picture: token.picture,
      provider: account.provider,
      emailVerified: dbUser.emailVerified ? dbUser.emailVerified.toISOString() : null,
      exp: token.exp,
      iat: token.iat,
      jti: token.jti,
      createdAt: dbUser.createdAt.toISOString(),
      updateAt: dbUser.updatedAt.toISOString(),
    };

    return token;
  }

  return token;
};

export default updateJwtToken;
