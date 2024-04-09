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
import { createOrganization, login } from "@/services/apiService";
import { toast } from "sonner";
import useProfile from "@/hooks/useProfile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function GettingStartedForm() {
  const { profile } = useProfile();
  const router = useRouter();

  useEffect(() => {
    console.log(profile);
    if (profile?.admin_id) {
      router.push("/dashboard");
      toast.success("You have already submitted the details");
    }
  }, [profile, router]);

  const form = useForm({
    // resolver: zodResolver({}),
    defaultValues: {
      buildingName: "",
      officerNumber: "",
      officeAddress: "",
      alterateNumber: "",
      city: "",
      country: "",
      pincode: "",
    },
  });

  const onSubmit = async (values) => {
    console.log({ values });

    try {
      const response = await createOrganization({
        building_name: values.buildingName,
        office_number: values.officerNumber,
        building_address: values.officeAddress,
        alternate_number: values.alterateNumber,
        city: values.city,
        country: values.country,
        pincode: values.pincode,
      });
      // toast.success("Successfully Logged in!");
      console.log(response);
      if (response.message === "success") {
        // router.push("/dashboard");
      } else {
        toast.error(response.message);
      }
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
            name="buildingName"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Building Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Building Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="officerNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Office Number</FormLabel>
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
            name="officeAddress"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Enter office address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter office addres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="alterateNumber"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Alternate Office Number</FormLabel>
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
