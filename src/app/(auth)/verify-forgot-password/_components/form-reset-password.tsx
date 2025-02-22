"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputFieldErrorMessage from "@/components/ui/input-error-message";
import changePassword from "@/lib/email-reset-password/change-password";
import { ResetPasswordAPIResponse } from "@/next-auth";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function FormResetPassword() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<ResetPasswordAPIResponse | null>(null);

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    setLoading(true);
    setMessage(null);

    const response = await changePassword({ confirmPassword: data.confirmPassword, email: email!, password: data.password });
    setLoading(false);
    setMessage(response);

    if (response.isSuccess) router.push("/login");
  };

  return (
    <main className="flex items-center justify-center h-screen  ">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>Reset Your Password</CardTitle>
          <CardDescription>Please enter your new password below to reset your account password.</CardDescription>
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
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                <InputFieldErrorMessage message={errors.password?.message ? errors.password.message : null} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Enter your password" {...register("confirmPassword")} />
                <InputFieldErrorMessage message={errors.confirmPassword?.message ? errors.confirmPassword.message : null} />
              </div>
            </div>

            <Button className={`w-full mt-4 ${loading ? "opacity-50" : ""}`} type="submit" disabled={loading}>
              {loading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
