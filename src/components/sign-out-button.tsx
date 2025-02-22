"use client";

import { logOut } from "@/lib/actions/logout";
import { MdLogout } from "react-icons/md";

const SignOutButton = () => {
  return (
    <button className="flex items-center p-1.5 gap-3 border-2 border-white rounded-md" onClick={logOut}>
      <p className="text-2xl">
        <MdLogout />
      </p>
      <p>Logout</p>
    </button>
  );
};
export default SignOutButton;
