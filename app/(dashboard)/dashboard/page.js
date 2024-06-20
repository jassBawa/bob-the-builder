'use client';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Page() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  console.log(currentUser);

  // useEffect(() => {
  //   if (currentUser) {
  //     router.push('/login');
  //   }
  // }, [currentUser, router]);

  return (
    <>
      <div className="mt-16 mx-8 rounded bg-white p-4">
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="text-sm">Track and Manage your information</p>
      </div>
      <div className="mt-4 mx-8 p-8 rounded bg-white">
        <div className="max-w-sm overflow-hidden">{currentUser?.name}</div>
        <h1 className="text-4xl font-bold">{currentUser?.email}</h1>
      </div>
    </>
  );
}

export default Page;
