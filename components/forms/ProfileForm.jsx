'use client';
import { useForm } from 'react-hook-form';
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
import { toast } from 'sonner';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

function ProfileForm({ profile, isEditMode, setIsEditMode }) {
  // const profile = useCurrentUser();
  // console.log(profile);
  console.log(profile);

  const form = useForm({
    // resolver: zodResolver({}),
    defaultValues: {
      organisationName: profile?.organisationName || ' ',
      organisationNumber: profile?.organisationNumber || '',
      organisationAddress: profile?.organisationAddress || '',
      alternateNumber: profile?.alterateNumber || '',
      city: profile?.city || '',
      country: profile?.country || '',
      pincode: profile?.pincode || '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const userDoc = doc(db, 'users', profile.uid);
      await updateDoc(userDoc, {
        ...values,
      }).then(() => {
        toast.success('Details updated!');
      });
      // const response = await updateProfile({
      //   building_name: values.companyName,
      //   office_number: values.officeNumber,
      //   building_address: values.officeAddress,
      //   alternate_number: values.alternateNumber,
      //   city: values.city,
      //   country: values.country,
      //   pincode: values.pincode,
      // });
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
            name="organisationName"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Ogranisation Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Organisation Name"
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
            name="organisationNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Office Number</FormLabel>
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
            name="organisationAddress"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Enter Organisation address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Organisation addres"
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
            name="alternateNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alternate Office Number</FormLabel>
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
            name="city"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your city here"
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
            name="country"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter country here"
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
            name="pincode"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Pincode</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your pincode here"
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

export default ProfileForm;
