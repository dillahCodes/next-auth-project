import { DefaultSession } from "next-auth";
import "next-auth/jwt";

export type ExtendedUser = DefaultSession["user"] & {
  emailVerified: string | null;
  provider: string;
  createdAt: string;
  updateAt: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Pick<ExtendedUser, "createdAt" | "updateAt" | "provider" | "emailVerified"> {}
}

type VerificationTokenType = "TOKEN_EXP" | "INVALID_TOKEN" | "UNKNOWN_ERROR" | null;

type ApiResponse<T> = {
  isSuccess: boolean;
  data?: T;

  message: string;
  messageCode?: VerificationTokenType;
};

export type RegisterAPIResponse = ApiResponse<{ id: string; name: string; email: string; createdAt: Date; updatedAt: Date }>;

export type LoginAPIResponse = ApiResponse<{ id: string; name: string; email: string; createdAt: Date; updatedAt: Date }>;
export type LoginFormMessageState = Pick<LoginAPIResponse, "isSuccess" | "message">;

export type SendEmailAPIResponse = Pick<ApiResponse<null>, "isSuccess" | "message">;
export type SendEmailAPIPayload = { email: string };
export type ValidateEmailVerificationTokenResponse = Pick<ApiResponse<null>, "isSuccess" | "messageCode"> & { message: string | null };

export type SendForgotPasswordEmailAPIResponse = Pick<ApiResponse<null>, "isSuccess" | "message">;
export type SendForgotPasswordEmailAPIPayload = { email: string };
export type ValidateForgotPasswordTokenResponse = Pick<ApiResponse<null>, "isSuccess" | "messageCode"> & { message: string | null };

export type ResetPasswordAPIResponse = Pick<ApiResponse<null>, "isSuccess" | "message">;
export type ResetPasswordAPIPayload = { email: string; password: string; confirmPassword: string };
