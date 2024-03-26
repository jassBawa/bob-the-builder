import SignupForm from "@/components/forms/SignupForm";
import React from "react";
// import SignupForm from "@/components/forms/SignupForm";

function SignupPage() {
  return (
    <div className=" flex items-center justify-center">
      <div className="max-w-sm w-full">
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
