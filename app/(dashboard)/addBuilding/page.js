'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/Input';
import { db, storage } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import { uploadFile } from '@/lib/uploadToFirebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useState } from 'react';

function Addbuilding() {
  const currentUser = useCurrentUser();
  console.log(currentUser);

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleChange1 = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  const form = useForm({
    // resolver: zodResolver(BuildingSchema),
    defaultValues: {
      registeredAddress: '',
      city: '',
      country: '',
      buildingUse: '',
      storyHeights: '',
      yearOfConstruction: '',
      totalBuiltUpArea: '',
      groundCoverageArea: '',
      buildingStructuralSystem: '',
      foundationType: '',
    },
  });

  const onSubmit = async (values) => {
    try {
      const date = new Date();
      const pdf1Url = await uploadFile(
        storage,
        currentUser?.uid,
        file1,
        'structuralReport',
        date
      );
      const pdf2Url = await uploadFile(
        storage,
        currentUser?.uid,
        file2,
        'georeport',
        date
      );

      // Create a new building document reference
      const buildingsRef = collection(
        doc(db, 'users', currentUser.uid),
        'buildings'
      );
      const newBuildingRef = await addDoc(buildingsRef, {
        ...values, // Include all building data fields
        structuralReportUrl: pdf1Url,
        georeportUrl: pdf2Url,
      }).then(() => {
        toast.success('Building added ');
      });

      console.log(newBuildingRef);
    } catch (error) {
      toast.error(error);
    }

    // close modal
  };
  return (
    <>
      <div className="mt-16 mx-8 p-8 rounded bg-white">
        <h2 className="text-2xl font-semibold">
          Please add building data here
        </h2>
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
                name="buildingUse"
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
                name="storyHeights"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Story Heights</FormLabel>
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
                name="yearOfConstruction"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Year of Construction</FormLabel>
                      <FormControl>
                        <Input placeholder="year of construction" {...field} />

                        {/* <DatePicker date={''} setDate={() => {}} /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="totalBuiltUpArea"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Total built-up Area (in Sqm)</FormLabel>
                      <FormControl>
                        <Input placeholder="DD//" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="GroundCoverageArea"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Ground Coverage Area (in Sqm)</FormLabel>
                      <FormControl>
                        <Input placeholder="..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="buildingStructuralSystem"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Building Structural System </FormLabel>
                      <FormControl>
                        <Input placeholder=".." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="foundationType"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Foundation Type</FormLabel>
                      <FormControl>
                        <Input placeholder="...." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormItem>
                <FormLabel>Geo technical Report available</FormLabel>
                <Input type="file" onChange={handleChange1}></Input>
              </FormItem>
              <FormItem>
                <FormLabel>Structural Drawing available</FormLabel>
                <Input type="file" onChange={handleChange2}></Input>
              </FormItem>
            </div>
            <Button type="submit" className="mt-8 px-8">
              Save
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Addbuilding;
