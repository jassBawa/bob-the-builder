'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { options } from '@/config/testsConfig';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import useNdtStore from '@/hooks/useNdtData';
import { doc, updateDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function NDTForm() {
  const [topic, setTopic] = useState('');
  const [subtopic, setSubtopic] = useState('');
  const [Component, setComponent] = useState(null);
  const officer = useCurrentUser('officer');
  const pathName = usePathname();
  const [loading, setIsLoading] = useState(false);
  const { ndtdata } = useNdtStore();
  const officerId = officer?.uid;

  // Split the URL by '/'
  let segments = pathName.split('/');

  // Extract the orgid and buildingId
  let organisationId = segments[4];
  let buildingId = segments[5];

  const handleTopicChange = (value) => {
    setTopic(value);
    setSubtopic('Rebound hammer');
  };

  const handleSubtopicChange = (value) => {
    setSubtopic(value);
  };

  useEffect(() => {
    if (topic && subtopic) {
      const subtopicObj = options[topic].find(
        (subtop) => subtop.name === subtopic
      );
      setComponent(() => subtopicObj?.component || null);
    } else {
      setComponent(null);
    }
  }, [subtopic, topic]);

  const handleSaveData = async () => {
    const reportId = `${buildingId}_${officerId}`;
    console.log(reportId);

    setIsLoading(true);
    const formData = {
      ndtdata: ndtdata,
    };
    try {
      const docRef = doc(db, `officer/${officerId}/reports/${reportId}`);
      await updateDoc(docRef, formData).then(() =>
        toast.success('Data saved successfully')
      );
      console.log('Data updated successfully!');
    } catch (error) {
      console.error('Error updating data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 p-8 mx-8 rounded bg-white grid grid-cols-2 gap-8">
      <div>
        <Label>Select Test</Label>
        <Select value={topic} onValueChange={handleTopicChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a test" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in situ concrete strength">
              In Situ Concrete Strength
            </SelectItem>
            <SelectItem value="chemical">Chemical Attack</SelectItem>
            <SelectItem value="corrosion">Corrosion Attack</SelectItem>
            <SelectItem value="strucutralIntegrity">
              Strucutural Integrity
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Select Subtopic</Label>
        <Select
          value={subtopic}
          onValueChange={handleSubtopicChange}
          disabled={!topic}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {topic &&
              options[topic].map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        {Component ? (
          <Component />
        ) : (
          <div>Please select a test and subtopic</div>
        )}

        <Button disabled={loading} onClick={handleSaveData}>
          Save data
        </Button>
      </div>
    </div>
  );
}

export default NDTForm;
