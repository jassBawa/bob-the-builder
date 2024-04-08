"use client";
import useProfile from "@/hooks/useProfile";
import { useAuthStore } from "@/state/auth";

function Page() {
  const { profile } = useProfile();
  const { token, name } = useAuthStore();
  console.log(name);
  return (
    <>
      <div className="mt-16 mx-8 p-8 rounded bg-white">
        <h2 className="text-2xl font-semibold">Welcome back, Lorem ipsum</h2>
        <p className="text-sm">Track and Manage your information</p>
      </div>
      <div className="mt-4 mx-8 p-8 rounded bg-white">
        <div className="max-w-sm overflow-hidden">{token}</div>
        <h1 className="text-4xl font-bold">{name}</h1>
        Generate code
      </div>
    </>
  );
}

export default Page;
