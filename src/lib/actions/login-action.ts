"use server";

import { signIn } from "@/auth";

export const logInWithGithub = async () => await signIn("github", { redirectTo: "/user-info" });
export const logInWithGoogle = async () => await signIn("google", { redirectTo: "/user-info" });
