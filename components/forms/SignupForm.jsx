'use client';
import { signupSchema } from '@/lib/formValidations';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { auth, db } from '@/firebase';
import Link from 'next/link';
import { toast } from 'sonner';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
// import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, setDoc } from 'firebase/firestore';
import { Checkbox } from '../ui/checkbox';

function SignupForm() {
  // const router = useRouter();

  const { handleSubmit, ...form } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      isOrg: false,
    },
  });

  const onSubmit = async (values) => {
    console.log({ values });

    try {
      // handle signup with name addition
      const { email, password, name, isOrg } = values; // Destructure name from values

      // const userCred = createUserWithEmailAndPassword(auth, email, password);
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          const uid = user.uid; // Get the current user's unique identifier (uid)

          // Create a new document in the "users" collection with the user's uid as the document ID
          const userRef = collection(db, 'users', uid);
          console.log(userRef);
          return setDoc(userRef, {
            name, // Add the name property to the user data
            email, // Add other relevant user data as needed (e.g., isOrg)
            // ... other user properties
            role: isOrg ? 'Organization' : 'officer',
          });
        }
      );

      // toast.success('Successfully signed up!');
      console.log(user); // Log the created user object
      router.push(`${isOrg ? '/dashboard' : '/officer'}`);
    } catch (error) {
      toast.error(error.message || 'An error occurred during signup.'); // Provide a more user-friendly error message
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
            <FormField
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
