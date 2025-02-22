import { CardDescription } from "@/components/ui/card";
import { ValidateEmailVerificationTokenResponse } from "@/next-auth";

const createDescription = ({ messageCode }: Pick<ValidateEmailVerificationTokenResponse, "messageCode">) => {
  switch (messageCode) {
    case "TOKEN_EXP":
      return "Sorry Your Token In Expired, Please Login to get new Token";
    case "INVALID_TOKEN":
      return "Sorry Your Token In Invalid, Please Login to get new Token";
    case "UNKNOWN_ERROR":
      return "An unknown error occurred. Please try again.";
    default:
      return "Thank you for verifying your email address! You can now proceed to the login page and enjoy full access to our features.";
  }
};

export default function VerifyEmailDescription({ messageCode }: Pick<ValidateEmailVerificationTokenResponse, "messageCode">) {
  const description = createDescription({ messageCode });
  return <CardDescription>{description}</CardDescription>;
}
