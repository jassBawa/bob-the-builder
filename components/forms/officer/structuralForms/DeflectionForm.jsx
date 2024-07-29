import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { TableCell, TableRow } from '@/components/ui/table';
import useStructuralObservations from '@/hooks/useStructuralObservations';
import React from 'react';

function DeflectionForm() {
  const { structuralObservationsData, addItem, removeItem, updateItem } =
    useStructuralObservations();

  console.log(structuralObservationsData);
  const { deflection } = structuralObservationsData;

  const handleAddDeflection = () => {
    console.log('handle add');
    addItem('deflection', {
      id: Date.now(),
      element: '',
      location: '',
      photo: '',
    });
  };

  const handleRemoveDeflection = (id) => {
    removeItem('deflection', id);
  };

  const handleChange = (id, field, value) => {
    const updatedDeflection = {
      ...deflection.find((ele) => ele.id === id),
      [field]: value,
    };
    updateItem('deflection', id, updatedDeflection);
  };

  const onPhotoChange = async (id, event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = await uploadImages(files[0]);
      const updatedDeflection = {
        ...deflection.find((ele) => ele.id === id),
        photo: url,
      };
      updateItem('deflection', id, updatedDeflection);
    }
  };

  return (
    <>
      {deflection.map((deflection) => (
        <React.Fragment key={deflection.id}>
          <TableRow>
            <TableCell className="font-medium border-r">Deflection</TableCell>
            <TableCell>
              <Input
                type="text"
                value={deflection.element}
                onChange={(e) =>
                  handleChange(deflection.id, 'element', e.target.value)
                }
              />
            </TableCell>

            <TableCell>
              <Input
                type="text"
                value={deflection.location}
                onChange={(e) =>
                  handleChange(deflection.id, 'location', e.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="file"
                name="photo"
                onChange={(e) => onPhotoChange(deflection.id, e)}
              />
            </TableCell>
            {/* Add more input fields for, location, photo */}
            <TableCell>
              <Button
                variant="outline"
                onClick={() => handleRemoveDeflection(deflection.id)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ))}
      {/* <TableCell> */}
      <Button
        className="my-2"
        type="button"
        variant="outline"
        onClick={handleAddDeflection}
      >
        + Add Deflection
      </Button>
    </>
  );
}

export default DeflectionForm;
