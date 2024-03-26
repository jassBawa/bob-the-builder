"use client";
import { loginSchema } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

function SignupForm() {
  const { handleSubmit, ...form } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log({ values });
  };
  // const onInvalid = (errors) => console.error(errors); // helpful

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="text-3xl font-semibold">Login</header>
          <div className="inputs__container mt-4 grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" className="mt-8 w-full">
            Submit
          </Button>

          <Link href="/login" className="opacity-80 text-center mt-6 block">
            Already have an account?
            <span className="opacity-100 underline"> Sign In</span>
          </Link>
        </form>
      </Form>
    </div>
  );
}

export default SignupForm;
