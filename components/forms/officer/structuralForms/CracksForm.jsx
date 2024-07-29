import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { TableCell, TableRow } from '@/components/ui/table';
import useStructuralObservations from '@/hooks/useStructuralObservations';
import { uploadImages } from '@/lib/uploadToFirebase';
import React from 'react';

function CracksForm() {
  const { structuralObservationsData, addItem, removeItem, updateItem } =
    useStructuralObservations();

  console.log(structuralObservationsData);
  const cracks = structuralObservationsData.cracks;

  const handleAddCrack = () => {
    console.log('handle add');
    addItem('cracks', {
      id: Date.now(),
      element: '',
      location: '',
      photo: '',
    });
  };

  const handleRemoveCrack = (id) => {
    removeItem('cracks', id);
  };

  const handleChange = (id, field, value) => {
    const updatedCrack = {
      ...cracks.find((crack) => crack.id === id),
      [field]: value,
    };
    updateItem('cracks', id, updatedCrack);
  };

  const onPhotoChange = async (id, event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = await uploadImages(files[0]);
      const updatedCrack = {
        ...cracks.find((crack) => crack.id === id),
        photo: url,
      };
      updateItem('cracks', id, updatedCrack);
      console.log(updatedCrack);
    }
  };

  return (
    <>
      {cracks.map((crack) => (
        <React.Fragment key={crack.id}>
          <TableRow>
            <TableCell className="font-medium border-r">Cracks</TableCell>
            <TableCell>
              <Input
                type="text"
                value={crack.element}
                onChange={(e) =>
                  handleChange(crack.id, 'element', e.target.value)
                }
              />
            </TableCell>

            <TableCell>
              <Input
                type="text"
                value={crack.location}
                onChange={(e) =>
                  handleChange(crack.id, 'location', e.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="file"
                name="photo"
                onChange={(e) => onPhotoChange(crack.id, e)}
              />
            </TableCell>
            {/* Add more input fields for, location, photo */}
            <TableCell>
              <Button
                variant="outline"
                onClick={() => handleRemoveCrack(crack.id)}
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
        onClick={handleAddCrack}
      >
        + Add crack
      </Button>
      {/* </TableCell> */}
    </>
  );
}

export default CracksForm;
