import SignupForm from '@/components/forms/SignupForm';
import React from 'react';
// import SignupForm from "@/components/forms/SignupForm";

function SignupPage() {
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
          <SignupForm />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
