import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { EmailNotVerifiedError, LoginWrongPassword, MissingEmailOrPasswordError, UserNotFoundError } from "./lib/errors/auth-errors";
import sendEmailVerification from "./lib/email-verification/send-email-verification";
import prisma from "./lib/prisma";
import changeOauthEmailVerified from "./lib/update-users/change-oauth-email-verified";
import updateJwtToken from "./lib/update-users/update-jwt-token";
import updateSessionUser from "./lib/update-users/update-session-user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 2 * 24 * 60 * 60 }, // Reset after 2 days
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validate credentials
        if (!credentials) throw new MissingEmailOrPasswordError();

        // Extract email and password from credentials
        const email = credentials.email as string;
        const password = credentials.password as string;

        // Search for user by email
        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, password: true, email: true, name: true, emailVerified: true, image: true },
        });

        if (!user) throw new UserNotFoundError(email);

        // Check if user has a password set
        if (!user.password) throw new LoginWrongPassword(email);

        // Validate password by comparing with hashed password in database
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new LoginWrongPassword(email);

        // Check if email is verified
        if (!user.emailVerified) {
          await sendEmailVerification({ email });
          throw new EmailNotVerifiedError(user.email);
        }

        // Return user details if authorization is successful
        return { email: user.email, name: user.name, id: user.id, image: user.image };
      },
    }),
    GitHub({
      name: "Github",
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // update jwt token value
      const updatedJwtToken = await updateJwtToken(token, user, account);
      token = updatedJwtToken;

      // Set email verified for specific users
      await changeOauthEmailVerified(account, user);
      return token;
    },
    async session({ session, token }) {
      // update session filter credential session
      const updatedSession = updateSessionUser({ session, token });
      session = updatedSession as typeof session;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
