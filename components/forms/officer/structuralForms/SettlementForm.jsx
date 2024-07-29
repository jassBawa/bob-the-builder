import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { TableCell, TableRow } from '@/components/ui/table';
import useStructuralObservations from '@/hooks/useStructuralObservations';
import React from 'react';

function SettlementForm() {
  const { structuralObservationsData, addItem, removeItem, updateItem } =
    useStructuralObservations();

  const { settlement } = structuralObservationsData;

  const handleAddSettlement = () => {
    console.log('handle add');
    addItem('settlement', {
      id: Date.now(),
      element: '',
      location: '',
      photo: '',
    });
  };

  const handleRemoveSettlement = (id) => {
    removeItem('settlement', id);
  };

  const handleChange = (id, field, value) => {
    const udpatedSettlement = {
      ...settlement.find((settlment) => settlment.id === id),
      [field]: value,
    };
    updateItem('settlement', id, udpatedSettlement);
  };

  return (
    <>
      {settlement.map((settlement) => (
        <React.Fragment key={settlement.id}>
          <TableRow>
            <TableCell className="font-medium border-r">Settlement</TableCell>
            <TableCell>
              <Input
                type="text"
                value={settlement.element}
                onChange={(e) =>
                  handleChange(settlement.id, 'element', e.target.value)
                }
              />
            </TableCell>

            <TableCell>
              <Input
                type="text"
                value={settlement.location}
                onChange={(e) =>
                  handleChange(settlement.id, 'location', e.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Input
                type="file"
                name="photo"
                onChange={(e) => onPhotoChange(settlement.id, e)}
              />
            </TableCell>
            {/* Add more input fields for, location, photo */}
            <TableCell>
              <Button
                variant="outline"
                onClick={() => handleRemoveSettlement(settlement.id)}
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
        onClick={handleAddSettlement}
      >
        + Add Settlement
      </Button>
    </>
  );
}

export default SettlementForm;
