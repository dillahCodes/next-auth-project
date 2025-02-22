import { signOut } from "next-auth/react";

export const logOut = async () => signOut({ redirectTo: "/login" });
