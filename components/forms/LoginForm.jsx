import React from "react";
import InputField from "../ui/InputField";
import { Button } from "../ui/button";

function LoginForm() {
  return (
    <div>
      <form className="">
        <header className="text-3xl font-semibold">Login</header>
        <div className="inputs__container mt-4 grid grid-cols-1 gap-4">
          <InputField
            name={"email"}
            placeholder={"johndoe@gmail.com"}
            label={"Email"}
          />
          <InputField
            name={"password"}
            placeholder={"Enter your password"}
            label={"password"}
          />
        </div>
        <Button className=" mt-4 w-full">Log In</Button>
      </form>
      <p className="opacity-80 text-center mt-6">
        Don&apos;t have an account?
        <span className="opacity-100 underline"> Sign Up</span>
      </p>
    </div>
  );
}

export default LoginForm;
