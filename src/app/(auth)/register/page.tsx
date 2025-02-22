"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputFieldErrorMessage from "@/components/ui/input-error-message";
import { logInWithGithub, logInWithGoogle } from "@/lib/actions/login-action";
import { RegisterWithCredentials } from "@/lib/actions/register-action";
import { RegisterAPIResponse } from "@/next-auth";
import { registerSchema, RegisterSchemaType } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<RegisterAPIResponse | null>(null);

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true);
    setResponse(null);

    const response = await RegisterWithCredentials(data);

    setLoading(false);
    setResponse(response);
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <Card className="max-w-[500px] w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Sign Up to Continue</CardDescription>
        </CardHeader>

        <CardContent>
          {response?.message && (
            <InputFieldErrorMessage
              message={response.message}
              className={clsx("mb-4  p-2 rounded-md ", {
                "text-red-500 bg-red-100": !response.isSuccess,
                "text-green-500 bg-green-100": response.isSuccess,
              })}
            />
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="userName">User Name</Label>
                <Input id="userName" type="text" placeholder="jhonsmith" {...register("userName")} />
                {errors.userName && <InputFieldErrorMessage message={errors.userName?.message ?? null} />}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jhonsmith@example.com" {...register("email")} />
                {errors.email && <InputFieldErrorMessage message={errors.email?.message ?? null} />}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
                {errors.password && <InputFieldErrorMessage message={errors.password.message ?? null} />}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" {...register("confirmPassword")} />
                {errors.confirmPassword && <InputFieldErrorMessage message={errors.confirmPassword.message ?? null} />}
              </div>
            </div>

            <Button className="w-full mt-4" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
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

          <p className="text-sm my-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default RegisterPage;
