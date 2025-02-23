"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputFieldErrorMessage from "@/components/ui/input-error-message";
import { logInWithGithub, logInWithGoogle } from "@/lib/actions/login-action";
import { LoginFormMessageState, SendEmailAPIResponse } from "@/next-auth";
import { loginSchema, LoginSchemaType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<LoginFormMessageState | null>(null);

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      setLoading(true);
      setMessage(null);

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      const messages: Record<string, SendEmailAPIResponse> = {
        EMAIL_NOT_VERIFIED: { message: "Email verification has been sent.", isSuccess: true },
        INVALID_CREDENTIALS: { message: "Invalid Email or Password", isSuccess: false },
      };

      if (result?.code && result.code in messages) return setMessage(messages[result.code]);

      setMessage({ message: "Login successful. Redirecting...", isSuccess: true });
      setTimeout(() => router.push("/user-info"), 1000);
    } catch (error) {
      setMessage({ message: error instanceof Error ? error.message : "An error occurred", isSuccess: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen  ">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>

        <CardContent>
          {message && (
            <InputFieldErrorMessage
              message={message.message ? message.message : null}
              className={clsx("mb-4  p-2 rounded-md ", {
                "text-red-500 bg-red-100": !message.isSuccess,
                "text-green-500 bg-green-100": message.isSuccess,
              })}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jhonsmith@example.com" {...register("email")} />
                <InputFieldErrorMessage message={errors.email?.message ?? null} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                <InputFieldErrorMessage message={errors.password?.message ?? null} />
              </div>
            </div>

            <div className="w-full flex flex-col justify-center items-center mt-4">
              <Link href="/forgot-password" className="text-blue-600 hover:underline self-end">
                Forgot password?
              </Link>
            </div>

            <Button className={`w-full mt-4 ${loading ? "opacity-50" : ""}`} type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <div className="w-full flex items-center gap-2">
            <div className="w-full border border-black" />
            <p className="text-sm">OR</p>
            <div className="w-full border border-black" />
          </div>

          <div className="w-full flex gap-4">
            <Button className="w-full flex items-center gap-2 border-black" variant="outline" onClick={logInWithGithub}>
              <FaGithub />
              <p>GitHub</p>
            </Button>
            <Button className="w-full flex items-center gap-2 border-black" variant="outline" onClick={logInWithGoogle}>
              <FcGoogle />
              <p>Google</p>
            </Button>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex items-center gap-1">
              <p>Don't have an account? </p>
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
