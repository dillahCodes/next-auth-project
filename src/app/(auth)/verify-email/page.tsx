import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import validateVerificationToken from "@/lib/email-verification/validate-verification-token";
import { redirect } from "next/navigation";
import VerifyEmailDescription from "./_components/verify-email-description";
import VerifyEmailTitle from "./_components/verify-email-title";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ token?: string; email?: string }>;
}
export default async function VerifyEmailPage({ searchParams }: SearchPageProps) {
  const token = (await searchParams).token;
  const email = (await searchParams).email;
  const resultValidateToken = await validateVerificationToken(token, email);

  return (
    <main className="flex items-center justify-center min-h-screen p-3">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <VerifyEmailTitle messageCode={resultValidateToken.messageCode} />
          </CardTitle>
          <CardDescription>
            <VerifyEmailDescription messageCode={resultValidateToken.messageCode} />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Link href="/login" className="p-1.5 px-2 rounded-md bg-black text-white">
            Login
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
