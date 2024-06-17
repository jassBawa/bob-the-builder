'use client';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
// import { zodResolver } from '@hookform/resolvers/zod';
// import { OrganisationFormSchema } from '@/lib/formValidations';

function OfficerGettingStartedForm() {
  const router = useRouter();
  const currentUser = useCurrentUser('officer');
  console.log(currentUser);
  const form = useForm({
    // resolver: zodResolver(OrganisationFormSchema),
    defaultValues: {
      number: '',
      employeeId: '',
      company: '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

    try {
      const userDoc = doc(db, 'officer', currentUser.uid);
      await updateDoc(userDoc, {
        ...values,
        email: currentUser?.email,
        name: currentUser?.name
      }).then(() => {
        toast.success('Information updated!');
        router.push('/officer');
      });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Form {...form} className="mt-12">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid gap-4 grid-cols-3">
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="98787XXX" {...field} />
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
                    <Input placeholder="928929292" {...field} />
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
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button type="submit" className="mt-8 px-8">
          Save Information
        </Button>
      </form>
    </Form>
  );
}

export default OfficerGettingStartedForm;
