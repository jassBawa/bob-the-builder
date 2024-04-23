'use client';
import LoginForm from '@/components/forms/LoginForm';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.uid) {
      router.push(
        `${currentUser.role === 'officer' ? '/officer' : '/dashboard'}`
      );
    }
  }, [currentUser, router]);

  return (
    <div className="flex *:flex-1 h-screen">
      <div className=" bg-[#0E0E22] flex items-center justify-center">
        <img
          src="/logo.png"
          alt="Brand"
          className="h-48 object-contain mx-auto"
        />
      </div>
      <div className=" flex items-center justify-center">
        <div className="max-w-sm w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
