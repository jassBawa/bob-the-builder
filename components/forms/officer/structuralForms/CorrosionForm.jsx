import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { TableCell, TableRow } from '@/components/ui/table';
import useStructuralObservations from '@/hooks/useStructuralObservations';
import React from 'react';

function CorrosionForm() {
  const { structuralObservationsData, addItem, removeItem, updateItem } =
    useStructuralObservations();

  console.log(structuralObservationsData);
  const { corrosion } = structuralObservationsData;

  const handleAddCorrosion = () => {
    console.log('handle add');
    addItem('corrosion', {
      id: Date.now(),
      element: '',
      location: '',
      photo: '',
    });
  };

  const handleRemoveCorrosion = (id) => {
    removeItem('corrosion', id);
  };

  const handleChange = (id, field, value) => {
    const updatedCorrosion = {
      ...corrosion.find((ele) => ele.id === id),
      [field]: value,
    };
    updateItem('corrosion', id, updatedCorrosion);
  };

  const onPhotoChange = async (id, event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = await uploadImages(files[0]);
      const updatedCorrosion = {
        ...corrosion.find((ele) => ele.id === id),
        photo: url,
      };
      updateItem('corrosion', id, updatedCorrosion);
    }
  };

  return (
    <>
      {corrosion.map((Corrosion) => (
        <React.Fragment key={Corrosion.id}>
          <TableRow>
            <TableCell className="font-medium border-r">corrosion</TableCell>
            <TableCell>
              <Input
                type="text"
                value={Corrosion.element}
                onChange={(e) =>
                  handleChange(Corrosion.id, 'element', e.target.value)
                }
              />
            </TableCell>

            <TableCell>
              <Input
                type="text"
                value={Corrosion.location}
                onChange={(e) =>
                  handleChange(Corrosion.id, 'location', e.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="file"
                name="photo"
                onChange={(e) => onPhotoChange(Corrosion.id, e)}
              />
            </TableCell>
            {/* Add more input fields for, location, photo */}
            <TableCell>
              <Button
                variant="outline"
                onClick={() => handleRemoveCorrosion(Corrosion.id)}
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
        onClick={handleAddCorrosion}
      >
        + Add Corrosion
      </Button>
      {/* </TableCell> */}
    </>
  );
}

export default CorrosionForm;
