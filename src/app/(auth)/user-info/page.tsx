import { auth } from "@/auth";
import SignOutButton from "@/components/sign-out-button";
import Image from "next/image";

export default async function UserInfo() {
  const session = await auth();

  if (!session?.user) {
    return (
      <main className="flex items-center justify-center h-screen bg-black text-white">
        <div className="max-w-[400px] border-2 border-white rounded-md w-full p-3 flex flex-col gap-3">
          <p>You are not signed in</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="max-w-[400px] border-2 border-white rounded-md w-full p-3 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="p-2 border-y-2 border-white text-center capitalize text-lg">User Info</h1>
          <div className="flex flex-col w-full items-start">
            <div className="w-full flex items-center justify-between">
              <p className="font-medium w-1/3">Name:</p>
              <p className="w-2/3">{session.user.name}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="font-medium w-1/3">Email:</p>
              <p className="w-2/3">{session.user.email}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="font-medium w-1/3">Provider:</p>
              <p className="w-2/3">{session.user.provider}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="font-medium w-1/3 self-start">Photo:</p>
              <Image
                priority
                className="w-2/3 rounded-md border-2 border-white"
                src={session.user.image || "/default-user.png"}
                alt={`${session.user.name} profile image`}
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
        <div className="text-center w-full">
          <SignOutButton />
        </div>
      </div>
    </main>
  );
}
