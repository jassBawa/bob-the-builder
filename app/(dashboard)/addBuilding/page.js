'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { db, storage } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import { uploadFile } from '@/lib/uploadToFirebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

function Addbuilding() {
  const currentUser = useCurrentUser();
  // console.log(currentUser);
  const router = useRouter();

  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [file3, setFile3] = useState(null);

  const handleChange1 = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleChange2 = (event) => {
    setFile2(event.target.files[0]);
  };
  const handleChange3 = (event) => {
    setFile3(event.target.files[0]);
  };

  const form = useForm({
    // resolver: zodResolver(BuildingSchema),
    defaultValues: {
      buildingName: '',
      noOfStories: '',
      buildingUse: '',
      storyHeights: '',
      yearOfConstruction: '',
      totalBuiltUpArea: '',
      groundCoverageArea: '',
      buildingStructuralSystem: '',
      foundationType: '',
      otherInformation: '',
      nondampnessCracks: false,
      dampnessCracks: false,
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

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
        doc(db, 'organisation', currentUser.uid),
        'buildings'
      );
      const newBuildingRef = await addDoc(buildingsRef, {
        ...values, // Include all building data fields
        buildingId: uuidv4(),
        structuralReportUrl: pdf1Url,
        georeportUrl: pdf2Url,
      }).then((data) => {
        toast.success('Data added successfully ');
        router.push('/dashboard');
      });
      // console.log(newBuildingRef);
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
                name="buildingName"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-2">
                      <FormLabel>Building Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sports Complex" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="noOfStories"
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-1">
                      <FormLabel>Number of Stories</FormLabel>
                      <FormControl>
                        <Input placeholder="4" {...field} />
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
                      <FormLabel>Story Heights (In Feet)</FormLabel>
                      <FormControl>
                        <Input placeholder="200" {...field} />
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
                        <Input placeholder="May 2024" {...field} />

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
                        <Input placeholder="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="groundCoverageArea"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Ground Coverage Area (in Sqm)</FormLabel>
                      <FormControl>
                        <Input placeholder="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="buildingStructuralSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strcutural system</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select strucutral system for building" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Moment Frame (beam-column System)">
                          Moment Frame (beam-column System)
                        </SelectItem>
                        <SelectItem value="Braced Frame">
                          Braced Frame
                        </SelectItem>
                        <SelectItem value="Dual System (Frame+ strctural wall)">
                          Dual System (Frame+ strctural wall)
                        </SelectItem>
                        <SelectItem value="Pre-cast">Pre-cast</SelectItem>
                        <SelectItem value="Flat Slab-Structural wall/frame">
                          Flat Slab-Structural wall/frame
                        </SelectItem>
                        <SelectItem value="Load bearing masonry">
                          Load bearing Masonry
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foundationType"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Foundation Type</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select foundation type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Raft/Mat">Raft/Mat</SelectItem>
                            <SelectItem value="Footings/combined foundation">
                              Footings/combined foundation
                            </SelectItem>
                            <SelectItem value="other">other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="otherInformation"
                render={({ field }) => {
                  return (
                    <FormItem
                      className="col-span-3
                    "
                    >
                      <FormLabel>Any other information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a any extra information related to building"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide any extra information related to the building
                        here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormItem>
                <FormLabel>Geo technical Report</FormLabel>
                <Input type="file" onChange={handleChange1}></Input>
              </FormItem>
              <FormItem>
                <FormLabel>Structural Drawing</FormLabel>
                <Input type="file" onChange={handleChange2}></Input>
              </FormItem>
              {/* <FormItem>
                <FormLabel>Original Structural Drawing</FormLabel>
                <Input type="file" onChange={handleChange3}></Input>
              </FormItem> */}

              <FormField
                control={form.control}
                name="dampnessCracks"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md col-span-3 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Building having structural dampness/Cracks
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nondampnessCracks"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md col-span-3 p-4 -mt-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Building having non-structural dampness/Cracks
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-8 px-8">
              Add building
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Addbuilding;
