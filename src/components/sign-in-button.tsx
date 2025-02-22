"use client";

import { FaGithub } from "react-icons/fa";
import { logIn } from "../lib/actions/auth";

const SignInButton = () => {
  return (
    <button className="flex items-center p-1.5 gap-3 border-2 border-white rounded-md" onClick={logIn}>
      <p className="text-2xl">
        <FaGithub />
      </p>
      <p>Github</p>
    </button>
  );
};
export default SignInButton;
