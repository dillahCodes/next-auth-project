import { ValidateEmailVerificationTokenResponse } from "@/next-auth";
import prisma from "../prisma";

/**
 * Validates the email verification token.
 *
 * @param {string} [token] - The verification token provided by the user.
 * @param {string} [email] - The email associated with the verification token.
 * @returns {Promise<ValidateEmailVerificationTokenResponse>} - The validation result.
 */
const validateVerificationToken = async (token?: string, email?: string): Promise<ValidateEmailVerificationTokenResponse> => {
  try {
    if (!token || !email) return { isSuccess: false, messageCode: "INVALID_TOKEN", message: "Invalid token or email." };

    // Find the verification token in the database
    const tokenDb = await prisma.verificationToken.findUnique({
      select: { expires: true },
      where: { identifier_token: { identifier: email, token } },
    });

    console.log({ tokenDb });

    // If no token is found, return an invalid response
    if (!tokenDb) return { isSuccess: false, messageCode: "INVALID_TOKEN", message: "Invalid token or email." };

    // Check if the token has expired
    if (new Date() > tokenDb.expires) {
      await prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token } } });
      return { isSuccess: false, messageCode: "TOKEN_EXP", message: "Token has expired." };
    }

    // Mark email as verified and delete the token in a single transaction
    await prisma.$transaction([
      prisma.user.update({ where: { email }, data: { emailVerified: new Date() } }),
      prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token } } }),
    ]);

    return { isSuccess: true, message: null, messageCode: null };
  } catch (error) {
    console.error("Error during email verification:", error);
    return { isSuccess: false, messageCode: "UNKNOWN_ERROR", message: error instanceof Error ? error.message : "Internal server error." };
  }
};

export default validateVerificationToken;
