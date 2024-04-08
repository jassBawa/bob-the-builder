"use client";
import useBuildings from "@/hooks/useBuildings";
import { createBuilding } from "@/services/apiService";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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

function AddBuildingForm({ onClose }) {
  const { refetchBuildings } = useBuildings();

  const form = useForm({
    // resolver: zodResolver({}),
    defaultValues: {
      registeredAddress: "",
      city: "",
      country: "",
      building_use: "",
      file1: null,
      file2: null,
    },
  });

  const onSubmit = async (values) => {
    console.log({ values });

    try {
      const response = await createBuilding({
        registeredAddress: "",
        city: "",
        country: "",
        building_use: "",
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

    // close modal
    onClose();
    refetchBuildings();
  };
  return (
    <Form {...form} className="mt-12">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mt-4 grid gap-4 grid-cols-3">
          <FormField
            control={form.control}
            name="registeredAddress"
            render={({ field }) => {
              return (
                <FormItem className="col-span-2">
                  <FormLabel>Registred Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Registred Address" {...field} />
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
                    <Input placeholder="City" {...field} />
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
                <FormItem className="col-span-2">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="building_use"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Building Use</FormLabel>
                  <FormControl>
                    <Input placeholder="Building Usage" {...field} />
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
                  <FormLabel>Structural Drawings</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="" {...field} />
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

export default AddBuildingForm;
