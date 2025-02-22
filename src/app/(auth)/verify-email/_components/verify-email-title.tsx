import { CardTitle } from "@/components/ui/card";
import { FaRegCircleCheck } from "react-icons/fa6";
import { TbXboxX } from "react-icons/tb";
import { LuCalendarX } from "react-icons/lu";
import { ValidateEmailVerificationTokenResponse } from "@/next-auth";

const createMessage = ({ messageCode }: Pick<ValidateEmailVerificationTokenResponse, "messageCode">) => {
  switch (messageCode) {
    case "INVALID_TOKEN":
      return "Invalid Token";
    case "TOKEN_EXP":
      return "Token Expired";
    case "UNKNOWN_ERROR":
      return "An Unknown Error Occurred";
    default:
      return "Email Verified Successfully";
  }
};

function CreateIcon({ messageCode }: Pick<ValidateEmailVerificationTokenResponse, "messageCode">) {
  switch (messageCode) {
    case "INVALID_TOKEN":
      return (
        <span className="text-3xl text-red-600">
          <TbXboxX />
        </span>
      );

    case "TOKEN_EXP":
      <span className="text-3xl text-red-600">
        <LuCalendarX />
      </span>;

    case "UNKNOWN_ERROR":
      <span className="text-3xl text-red-600">
        <TbXboxX />
      </span>;

    default:
      return (
        <span className="text-3xl text-green-600">
          <FaRegCircleCheck />
        </span>
      );
  }
}

export default async function VerifyEmailTitle({ messageCode }: Pick<ValidateEmailVerificationTokenResponse, "messageCode">) {
  const title = createMessage({ messageCode });

  return (
    <CardTitle className="flex items-center gap-4">
      <CreateIcon messageCode={messageCode} />
      <span>{title}</span>
    </CardTitle>
  );
}
