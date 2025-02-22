import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ForgotPasswordDescription from "./_components/forgot-password-description";
import validateForgotPasswordToken from "@/lib/email-reset-password/validate-forgot-password-token";
import ForgotPasswordTitle from "./_components/forgot-password-title";
import Link from "next/link";
import FormResetPassword from "./_components/form-reset-password";

interface SearchPageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}
export default async function VerifyForgotPassword({ searchParams }: SearchPageProps) {
  const token = (await searchParams).token;
  const email = (await searchParams).email;
  const validateResult = await validateForgotPasswordToken(token, email);

  if (!validateResult.isSuccess && validateResult.message && validateResult.messageCode) {
    return (
      <main className="flex items-center justify-center min-h-screen p-3">
        <Card className="max-w-[500px] w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <ForgotPasswordTitle messageCode={validateResult.messageCode} message={validateResult.message} />
            </CardTitle>
            <CardDescription>
              <ForgotPasswordDescription messageCode={validateResult.messageCode} />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Link href="/forgot-password" className="p-1.5 px-2 rounded-md bg-black text-white">
              Resend Email
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  return <FormResetPassword />;
}
