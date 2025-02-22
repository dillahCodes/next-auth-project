import { CardTitle } from "@/components/ui/card";
import { VerificationTokenType } from "@/next-auth";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuCalendarX } from "react-icons/lu";
import { TbXboxX } from "react-icons/tb";

function CreateIcon({ messageCode }: { messageCode: VerificationTokenType }) {
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

    case null:
      return (
        <span className="text-3xl text-green-600">
          <FaRegCircleCheck />
        </span>
      );

    default:
      return (
        <span className="text-3xl text-red-600">
          <TbXboxX />
        </span>
      );
  }
}

export default async function ForgotPasswordTitle({
  messageCode,
  message,
}: {
  messageCode: VerificationTokenType;
  message: string;
}) {
  return (
    <CardTitle className="flex items-center gap-4">
      <CreateIcon messageCode={messageCode} />
      <h1>{message}</h1>
    </CardTitle>
  );
}
