'use client';
// import { createOrganization } from '@/services/apiService';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganisationFormSchema } from '@/lib/formValidations';

function GettingStartedForm() {
  const router = useRouter();
  const currentUser = useCurrentUser();
  console.log(currentUser);
  const form = useForm({
    // resolver: zodResolver(OrganisationFormSchema),
    defaultValues: {
      organisationName: '',
      organisationNumber: '',
      organisationAddress: '',
      alternateNumber: '',
      city: '',
      country: '',
      pincode: '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

    try {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, {
        ...values,
      }).then(() => {
        toast.success('Information updated!');
        router.push('/dashboard');
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const onError = (vl) => {
    console.log(vl);
  };
  return (
    <Form {...form} className="mt-12">
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="mt-4 grid gap-4 grid-cols-3">
          <FormField
            control={form.control}
            name="organisationName"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Organisation Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Organisation Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="organisationNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Organisation Number</FormLabel>
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
            name="organisationAddress"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Enter organisation address</FormLabel>
                  <FormControl>
                    <Input placeholder="Gill Park Ludhiana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="alternateNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alternate Organisation Number</FormLabel>
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
            name="city"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter country here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your pincode here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button type="submit" className="mt-8 px-8">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default GettingStartedForm;
