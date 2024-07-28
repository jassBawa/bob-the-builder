import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { TableCell, TableRow } from '@/components/ui/table';
import useStructuralObservations from '@/hooks/useStructuralObservations';
import React from 'react';

function LeakageAndDampnessForm() {
  const { structuralObservationsData, addItem, removeItem, updateItem } =
    useStructuralObservations();

  console.log(structuralObservationsData);
  const { leakageAndDampness } = structuralObservationsData;

  const handleAddLeakageAndDampness = () => {
    console.log('handle add');
    addItem('leakageAndDampness', {
      id: Date.now(),
      element: '',
      location: '',
      photo: '',
    });
  };

  const handleRemoveLeakageAndDampness = (id) => {
    removeItem('leakageAndDampness', id);
  };

  const handleChange = (id, field, value) => {
    const updatedLeakageAndDampness = {
      ...leakageAndDampness.find((ele) => ele.id === id),
      [field]: value,
    };
    updateItem('leakageAndDampness', id, updatedLeakageAndDampness);
  };

  const onPhotoChange = async (id, event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = await uploadImages(files[0]);
      const updatedLeakageAndDampness = {
        ...leakageAndDampness.find((ele) => ele.id === id),
        photo: url,
      };
      updateItem('leakageAndDampness', id, updatedLeakageAndDampness);
    }
  };
  return (
    <>
      {leakageAndDampness.map((leakageAndDampness) => (
        <React.Fragment key={leakageAndDampness.id}>
          <TableRow>
            <TableCell className="font-medium border-r">Dampness</TableCell>
            <TableCell>
              <Input
                type="text"
                value={leakageAndDampness.element}
                onChange={(e) =>
                  handleChange(leakageAndDampness.id, 'element', e.target.value)
                }
              />
            </TableCell>

            <TableCell>
              <Input
                type="text"
                value={leakageAndDampness.location}
                onChange={(e) =>
                  handleChange(
                    leakageAndDampness.id,
                    'location',
                    e.target.value
                  )
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="file"
                name="photo"
                onChange={(e) => onPhotoChange(leakageAndDampness.id, e)}
              />
            </TableCell>
            {/* Add more input fields for, location, photo */}
            <TableCell>
              <Button
                variant="outline"
                onClick={() =>
                  handleRemoveLeakageAndDampness(leakageAndDampness.id)
                }
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
      {/* <TableCell> */}
      <Button
        variant="outline"
        className="my-2"
        type="button"
        onClick={handleAddLeakageAndDampness}
      >
        + Add Dampness
      </Button>
      {/* </TableCell> */}
    </>
  );
}

export default LeakageAndDampnessForm;
