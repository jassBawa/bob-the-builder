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
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BuildingSchema } from "@/lib/formValidations";
// import { BuildingSchema } from "@/lib/formValidations";
// import { zodResolver } from "@hookform/resolvers/zod";

function AddBuildingForm({ onClose }) {
  const { refetchBuildings } = useBuildings();

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleChange1 = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  const form = useForm({
    resolver: zodResolver(BuildingSchema),
    defaultValues: {
      registeredAddress: "",
      city: "",
      country: "",
      building_use: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);
    formData.append("registeredAddress", values.registeredAddress);
    formData.append("city", values.city);
    formData.append("country", values.country);
    formData.append("building_use", values.building_use);

    // console.log(formData);
    try {
      const response = await createBuilding(formData);

      //   const response = true;
      // toast.success("Successfully Logged in!");
      console.log(response);
      if (response === "Success") {
        toast.success("Successfully added building details");
        // router.push("/dashboard");
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

          <FormItem>
            <FormLabel>File 1</FormLabel>
            <Input type="file" onChange={handleChange1}></Input>
          </FormItem>
          <FormItem>
            <FormLabel>File 2</FormLabel>
            <Input type="file" onChange={handleChange2}></Input>
          </FormItem>
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-8 mr-4 px-8"
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button type="submit" className="mt-8 px-8">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AddBuildingForm;
