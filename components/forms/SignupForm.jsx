'use client';
import { signupSchema } from '@/lib/formValidations';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { auth, db } from '@/firebase';
import Link from 'next/link';
import { toast } from 'sonner';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, ...form } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values, role);
    setIsLoading(true);
    try {
      // handle signup with name addition
      const { email, password, name } = values; // Destructure name from values

      const userCred = createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, `${role}`, (await userCred).user.uid), {
        email,
        name,
        role,
      }).then((res) => {
        toast.success('Created account successfully!');
        router.push(
          `${
            role === 'organisation'
              ? '/getting-started'
              : '/officer/getting-started'
          }`
        );
      });
    } catch (error) {
      toast.error(error.message || 'An error occurred during signup.'); // Provide a more user-friendly error message
    } finally {
      setIsLoading(false);
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
              name="role"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Please Select account type</FormLabel>
                    <div className="flex gap-2">
                      <Button
                        variant="outline" // Emphasize selected state (optional)
                        onClick={() => setRole('organisation')}
                        disabled={role === 'organisation'} // Prevent deselecting
                        className={`w-full  ${
                          role === 'organisation'
                            ? 'bg-green-300 !opacity-100 text-black'
                            : 'opacity-70'
                        }`}
                      >
                        Organisation
                      </Button>
                      <Button
                        variant="outline" // Different style (optional)
                        onClick={() => setRole('officer')}
                        disabled={role === 'officer'} // Prevent deselecting
                        className={`w-full !opacity-100 ${
                          role === 'officer'
                            ? 'bg-green-300 opacity-100 text-black'
                            : 'opacity-70'
                        }`}
                      >
                        Officer
                      </Button>
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Org Name / Officer name</FormLabel>
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
          </div>
          <Button disabled={isLoading} type="submit" className="mt-8 w-full">
            {isLoading ? 'loading' : 'Submit'}
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
