import { CardDescription } from "@/components/ui/card";
import { VerificationTokenType } from "@/next-auth";

const createDescription = ({ messageCode }: { messageCode: VerificationTokenType }) => {
  switch (messageCode) {
    case "TOKEN_EXP":
      return "Sorry Your Token Has Expired, Please Request a new verification email";
    case "INVALID_TOKEN":
      return "Sorry Your Token In Invalid, Please Request a new verification email";
    case "UNKNOWN_ERROR":
      return "An unknown error occurred. Please Request a new verification email";
    default:
      return "An unknown error occurred. Please Request a new verification email";
  }
};

export default function ForgotPasswordDescription({ messageCode }: { messageCode: VerificationTokenType }) {
  const description = createDescription({ messageCode });
  return <CardDescription>{description}</CardDescription>;
}
