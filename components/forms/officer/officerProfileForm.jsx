'use client';
import { useForm } from 'react-hook-form';
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
import { toast } from 'sonner';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

function OfficerProfileForm({ profile, isEditMode, setIsEditMode }) {
  // const profile = useCurrentUser();
  // console.log(profile);
  console.log(profile);

  const form = useForm({
    // resolver: zodResolver({}),
    defaultValues: {
      name: profile?.name || ' ',
      number: profile?.number || '',
      email: profile?.email || '',
      employeeId: profile?.employeeId || '',
      company: profile?.company || '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const userDoc = doc(db, 'officer', profile.uid);
      await updateDoc(userDoc, {
        ...values,
      }).then(() => {
        toast.success('Details updated!');
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setIsEditMode(false);
    }
  };

  return (
    <Form {...form} className="mt-12">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid gap-4 grid-cols-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="">
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="98787XXX"
                      {...field}
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="employeeId"
            render={({ field }) => {
              return (
                <FormItem className="">
                  <FormLabel>Employee id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="928929292"
                      {...field}
                      disabled={!isEditMode}
                    />
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
                  <FormLabel> Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndeo@gmail.com"
                      {...field}
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your company name"
                      {...field}
                      disabled={!isEditMode}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        {isEditMode && (
          <Button type="submit" className="mt-4 mb-4 px-8">
            Update Information
          </Button>
        )}
      </form>
    </Form>
  );
}

export default OfficerProfileForm;
