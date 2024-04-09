"use client";
import { signupSchema } from "@/lib/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { signup } from "@/services/apiService";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/state/auth";
import { toast } from "sonner";

function SignupForm() {
  const router = useRouter();
  const {
    login: loginStore,
    token,
    isLoggedIn,
  } = useAuthStore((state) => state);

  const { handleSubmit, ...form } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isOrg: false,
    },
  });

  const onSubmit = async (values) => {
    console.log({ values });

    try {
      const response = await signup(values);

      if (response.message === "success") {
        toast.success("Successfully signed up !");
        console.log(response);
        router.push("/login");
        // router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // const onInvalid = (errors) => console.error(errors);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <header className="text-3xl font-semibold">Sign Up</header>
          <div className="inputs__container mt-4 grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

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
            {/* <FormField
              control={form.control}
              name="isOrg"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0">
                      Register as Organisation
                    </FormLabel>

                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
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
