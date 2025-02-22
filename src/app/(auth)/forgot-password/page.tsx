"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputFieldErrorMessage from "@/components/ui/input-error-message";
import sendForgotPasswordEmail from "@/lib/email-reset-password/send-email-reset-password";
import { SendForgotPasswordEmailAPIResponse } from "@/next-auth";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<SendForgotPasswordEmailAPIResponse | null>(null);

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    setLoading(true);
    setMessage(null);

    const response = await sendForgotPasswordEmail({ email: data.email });

    setLoading(false);
    setMessage({
      message: response.message,
      isSuccess: response.isSuccess,
    });
  };

  return (
    <main className="flex items-center justify-center h-screen p-3">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>Enter your email to reset your password</CardDescription>
        </CardHeader>

        <CardContent>
          {message && (
            <InputFieldErrorMessage
              message={message.message}
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
                <InputFieldErrorMessage message={errors.email?.message ? errors.email.message : null} />
              </div>
            </div>

            <Button className={`w-full mt-4 ${loading ? "opacity-50" : ""}`} type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
