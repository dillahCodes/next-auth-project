import { ValidateForgotPasswordTokenResponse } from "@/next-auth";
import prisma from "../prisma";

/**
 * Validates the forgot password token.
 *
 * @param {string | undefined} token - The password reset token.
 * @param {string | undefined} email - The email associated with the token.
 * @returns {Promise<ValidateForgotPasswordTokenResponse>} - The validation result.
 */
const validateForgotPasswordToken = async (token?: string, email?: string): Promise<ValidateForgotPasswordTokenResponse> => {
  try {
    if (!token || !email) {
      return { isSuccess: false, messageCode: "INVALID_TOKEN", message: "Invalid token or email." };
    }

    // Find the verification token in the database
    const tokenDb = await prisma.verificationToken.findUnique({
      select: { expires: true },
      where: { identifier_token: { identifier: email, token } },
    });

    // If no token is found, return an invalid response
    if (!tokenDb) {
      return { isSuccess: false, messageCode: "INVALID_TOKEN", message: "Invalid token or email." };
    }

    // Check if the token has expired
    if (new Date() > tokenDb.expires) {
      await prisma.verificationToken.delete({ where: { identifier_token: { identifier: email, token } } });
      return { isSuccess: false, messageCode: "TOKEN_EXP", message: "Token has expired." };
    }

    return { isSuccess: true, message: null, messageCode: null };
  } catch (error) {
    console.error("Error during token validation:", error);
    return { isSuccess: false, messageCode: "UNKNOWN_ERROR", message: "Internal server error." };
  }
};

export default validateForgotPasswordToken;
