import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormLabel } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import useFormData from '@/hooks/useFormData';
import useMultiForm from '@/hooks/useMultiForm';
import React from 'react';

function GeneralObservations() {
  const { nextStep } = useMultiForm();
  const { generalObservationsData, updateGeneralObservationsData } =
    useFormData();

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    updateGeneralObservationsData({
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  console.log(generalObservationsData);

  return (
    <div>
      <h2 className="text-xl font-semibold ">Step 1: General Observation</h2>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="">
          <Label>Enter Date of Inspection</Label>
          <Input
            type="date"
            name="dateOfInspection"
            value={generalObservationsData.dateOfInspection}
            onChange={handleChange}
            placeholder="YYYY-MM-DD"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="">
          <Label>Enter Type of Structure</Label>
          <Input
            type="text"
            name="typeOfStructure"
            value={generalObservationsData.typeOfStructure}
            onChange={handleChange}
            placeholder="Type of Structure"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="">
          <Label>Enter Age of Building</Label>
          <Input
            type="text"
            name="ageOfBuilding"
            value={generalObservationsData.ageOfBuilding}
            onChange={handleChange}
            placeholder="Age of Building"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="">
          <Label>Enter Number of Stories</Label>
          <Input
            type="text"
            name="numberOfStories"
            value={generalObservationsData.numberOfStories}
            onChange={handleChange}
            placeholder="Number of Stories"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <Button type="button" onClick={nextStep}>
        Next
      </Button>
    </div>
  );
}

export default GeneralObservations;
