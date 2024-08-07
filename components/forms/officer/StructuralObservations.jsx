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
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import useGeneralObservations from '@/hooks/useGeneralObservations';
import useMultiForm from '@/hooks/useMultiForm';
import useStructuralObservations from '@/hooks/useStructuralObservations';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import CorrosionForm from '../officer/structuralForms/CorrosionForm';
import CracksForm from '../officer/structuralForms/CracksForm';
import DeflectionForm from '../officer/structuralForms/DeflectionForm';
import SettlementForm from '../officer/structuralForms/SettlementForm';
import LeakageAndDampnessForm from './structuralForms/LeakageAndDampnessForm';

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
  const { generalObservationsData } = useGeneralObservations();
  const { structuralObservationsData } = useStructuralObservations();
  const pathName = usePathname();
  const currentUser = useCurrentUser('officer');
  const router = useRouter();
  const [buildingData, setBuildingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(pathName);

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
      buildingData: buildingData,
      generalObservationsData: generalObservationsData,
      structuralObservationsData: structuralObservationsData,
      timestamp: new Date().toISOString(), // Optional: Add a timestamp
    };

    console.log(reportData);

    try {
      // Save report data to Firestore under both organisation and officer collections
      let reportId = `${buildingId}_${organisationId}`;

      // Save under organisation
      await setDoc(
        doc(db, `organisation/${organisationId}/reports`, reportId),
        reportData
      );

      reportId = `${buildingId}_${currentUser.uid}`;
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

  useEffect(() => {
    const fetchBuildings = async () => {
      // setLoading(true);
      // setError(null);
      try {
        const buildingsCollectionRef = collection(
          db,
          `organisation/${organisationId}/buildings`
        );
        const q = query(
          buildingsCollectionRef,
          where('buildingId', '==', buildingId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]; // Assuming there's only one building with this ID
          console.log(doc.data());
          setBuildingData({
            id: doc.id,
            ...doc.data(),
          });
        }
        console.log();
      } catch (err) {
        // setError(err.message);
        console.log(err);
      }
      // setLoading(false);
    };

    fetchBuildings();
  }, [buildingId, organisationId]);

  // console.log(structuralObservationsData);
  return (
    <div>
      <h2 className="text-xl font-semibold ">Step 2: Structural Observation</h2>
      <div className="">
        <div className="mt-8 grid gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Description</TableHead>
                <TableHead>Component</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Photos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <CracksForm />
              <CorrosionForm />
              <SettlementForm />
              <DeflectionForm />
              <LeakageAndDampnessForm />
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
        <SelectItem value="Fair">Fair</SelectItem>
        <SelectItem value="Bad">Bad</SelectItem>
      </SelectContent>
    </Select>
  );
};
