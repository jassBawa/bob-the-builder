"use client";
import { useForm } from "react-hook-form";
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
import useProfile from "@/hooks/useProfile";
import { updateProfile } from "@/services/apiService";
import { toast } from "sonner";

function ProfileForm({ isEditMode, setIsEditMode }) {
  const { profile } = useProfile();

  const form = useForm({
    // resolver: zodResolver({}),
    defaultValues: {
      companyName: profile?.building_name || " ",
      officeNumber: profile?.office_number || "",
      officeAddress: profile?.building_address || "",
      alternateNumber: profile?.alternate_number || "",
      city: profile?.city || "",
      country: profile?.country || "",
      pincode: profile?.pincode || "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const response = await updateProfile({
        building_name: values.companyName,
        office_number: values.officeNumber,
        building_address: values.officeAddress,
        alternate_number: values.alternateNumber,
        city: values.city,
        country: values.country,
        pincode: values.pincode,
      });
      toast.success("Successfully Update details!");
      console.log(response);
      if (response.message === "success") {
        console.log(response);
      }
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
            name="companyName"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company Name"
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
            name="officeNumber"
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
            name="officeAddress"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Enter office address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter office addres"
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
