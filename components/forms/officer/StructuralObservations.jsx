import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFormData from '@/hooks/useFormData';
import useMultiForm from '@/hooks/useMultiForm';
import CorrosionForm from '../officer/structuralForms/CorrosionForm';
import CracksForm from '../officer/structuralForms/CracksForm';
import SettlementForm from '../officer/structuralForms/SettlementForm';
import DeflectionForm from '../officer/structuralForms/DeflectionForm';
import ConditionOfForm from '../officer/structuralForms/ConditionOfForm';
import { usePathname, useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'sonner';
import { useState } from 'react';

export const staticOptions = [
  'Beam',
  'Slab',
  'Column',
  'Chajja',
  'Plaster',
  'Wall',
];
export const gradeOptions = ['Good', 'Bad', 'Fair'];

function StructuralObservations() {
  const { prevStep } = useMultiForm();
  const { structuralObservationsData, generalObservationsData } = useFormData();
  const pathName = usePathname();
  const currentUser = useCurrentUser('officer');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  console.log(pathName);

  // Split the URL by '/'
  let segments = pathName.split('/');

  // Extract the orgid and buildingId
  let organisationId = segments[4];
  let buildingId = segments[5];

  const handleSubmit = async () => {
    console.log(structuralObservationsData);
    setIsLoading(true);

    // Prepare data to be saved
    const reportData = {
      userId: currentUser.uid,
      buildingId: buildingId,
      generalObservationsData: generalObservationsData,
      structuralObservationsData: structuralObservationsData,
      timestamp: new Date().toISOString(), // Optional: Add a timestamp
    };

    try {
      // Save report data to Firestore under both organisation and officer collections
      const reportId = `${buildingId}_${currentUser.uid}`;

      // Save under organisation
      await setDoc(
        doc(db, `organisation/${organisationId}/reports`, reportId),
        reportData
      );

      // Save under officer
      await setDoc(
        doc(db, `officer/${currentUser.uid}/reports`, reportId),
        reportData
      ).then(() => {
        toast.success('Data added');
        router.push('/officer/requests');
      });

      console.log('Data successfully saved to Firebase!');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold ">Step 2: Structural Observation</h2>
      <div className="">
        <div className="mt-8 grid gap-8">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Description</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Photos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {' '}
                <CracksForm />{' '}
              </TableRow>

              {/* Settlement row */}
              <TableRow>
                <SettlementForm />
              </TableRow>

              {/* Corrosion */}
              <TableRow>
                <CorrosionForm />
              </TableRow>
              <TableRow>
                <DeflectionForm />
              </TableRow>
              <TableRow>
                <ConditionOfForm />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={prevStep}
        className="mr-4"
      >
        Prev
      </Button>
      <Button type="button" onClick={handleSubmit} disabled={isLoading}>
        Submit
      </Button>
    </div>
  );
}

export default StructuralObservations;

export const SelectGrade = ({ onChange, value }) => {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select Grade" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Good">Good</SelectItem>
        <SelectItem value="Bad">Bad</SelectItem>
        <SelectItem value="Fair">Fair</SelectItem>
      </SelectContent>
    </Select>
  );
};
