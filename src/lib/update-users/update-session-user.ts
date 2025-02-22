import { ExtendedUser } from "@/next-auth";
import { JWT } from "next-auth/jwt";

type UpdateSessionUser = {
  session: { user: ExtendedUser };
  token: JWT;
};

const updateSessionUser = ({ session, token }: UpdateSessionUser) => {
  if (token) {
    session.user.id = token.sub as string;
    session.user.email = token.email as string;
    session.user.name = token.name;
    session.user.image = token.picture;
    session.user.provider = token.provider;
    session.user.emailVerified = token.emailVerified;
    session.user.createdAt = token.createdAt;
    session.user.updateAt = token.updateAt;
  }

  return session;
};

export default updateSessionUser;
