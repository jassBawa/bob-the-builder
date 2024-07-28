import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import useGeneralObservations from '@/hooks/useGeneralObservations';
import useMultiForm from '@/hooks/useMultiForm';
import { useState } from 'react';

function GeneralObservations() {
  const { nextStep } = useMultiForm();
  const { generalObservationsData, setGeneralObservationsData } =
    useGeneralObservations();

  const [formData, setFormData] = useState(generalObservationsData);

  const handleChange = (event) => {
    console.log(event.target);
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSubmit = () => {
    setGeneralObservationsData(formData);
    nextStep();
  };

  console.log(formData);

  return (
    <div>
      <h2 className="text-xl font-semibold ">Step 1: General Observation</h2>
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div className="">
          <Label>Enter Date of Inspection</Label>
          <Input
            type="date"
            name="dateOfInspection"
            value={formData.dateOfInspection}
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
            value={formData.typeOfStructure}
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
            value={formData.ageOfBuilding}
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
            value={formData.numberOfStories}
            onChange={handleChange}
            placeholder="Number of Stories"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <Button type="button" onClick={handleSubmit}>
        Next
      </Button>
    </div>
  );
}

export default GeneralObservations;
