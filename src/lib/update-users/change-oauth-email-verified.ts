import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import prisma from "../prisma";

const changeOauthEmailVerified = async (account: Account | null, user: AdapterUser | User) => {
  const userAdapter = user as AdapterUser;
  const accountTypes = ["oidc", "oauth"];
  const shouldUpdateEmailVerified: boolean = accountTypes.includes(account?.type || "") && !userAdapter.emailVerified;
  if (!shouldUpdateEmailVerified) return;

  try {
    await prisma.user.update({
      where: { id: user!.id },
      data: {
        emailVerified: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error updating emailVerified:", error);
  }
};

export default changeOauthEmailVerified;
