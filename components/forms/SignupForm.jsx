import React from "react";
import InputField from "../ui/InputField";
import { Button } from "../ui/button";

function SignupForm() {
  return (
    <div>
      <form className="">
        <header className="text-3xl font-semibold">Sign up</header>
        <div className="inputs__container mt-4 grid grid-cols-1 gap-4">
          <InputField
            name={"email"}
            placeholder={"Enter your email address"}
            label={"Email"}
          />
          <InputField
            name={"password"}
            placeholder={"Create a password"}
            label={"Email"}
          />
          <InputField
            name="confirmPassword"
            placeholder="Re-enter your password"
            label="Confirm Password"
          />
        </div>
        <Button className=" mt-4 w-full">Get Started</Button>
      </form>
      <p className="opacity-80 text-center mt-6">
        Already have an account?{" "}
        <span className="opacity-100 underline"> Log in</span>
      </p>
    </div>
  );
}

export default SignupForm;
