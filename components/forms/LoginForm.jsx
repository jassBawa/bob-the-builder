'use client';
import { loginSchema } from '@/lib/formValidations';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import Link from 'next/link';
import { toast } from 'sonner';

import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState('');

  const { handleSubmit, ...form } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    const { email, password } = values;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential) {
        console.log(userCredential.user);
        toast.success('Successfully Logged in!');
      }

      router.push(`${role === 'officer' ? '/officer' : '/dashboard'}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <header className="text-3xl font-semibold">Login</header>
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
                    <Input placeholder="Password" type="password" {...field} />
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

        <Link href="/signup" className="opacity-80 text-center mt-6 block">
          Already have an account?
          <span className="opacity-100 underline"> Sign Up</span>
        </Link>
      </form>
    </Form>
  );
}
