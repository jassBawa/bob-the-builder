import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import React from 'react';
import { SelectGrade } from '../../officer/StructuralObservations';
import useFormData from '@/hooks/useFormData';

function DeflectionForm() {
  const {
    structuralObservationsData,
    handleGradeChange,
    handleLocationChange,
    handlePhotoChange,
  } = useFormData();

  const {deflection} = structuralObservationsData;

  const onLocationChange = (event, type) => {
    const { name, value } = event.target;
    handleLocationChange(type, name, value);
  };

  const onPhotoChange = (event, type) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      handlePhotoChange(type, name, files[0]);
    }
  };

  return (
    <>
      <TableCell className="font-medium border-r">Deflection</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-0 ">
        <p className="py-2 px-4  border-b-2">Beam</p>
        <p className="py-2 px-4 border-b-2">Slab</p>

      </TableCell>
      <TableCell className="space-y-4">
        <SelectGrade
          value={deflection.beam.grade}
          onChange={(value) => handleGradeChange('deflection', 'beam', value)}
        />
        <SelectGrade
          value={deflection.slab.grade}
          onChange={(value) => handleGradeChange('deflection', 'slab', value)}
        />
       
      </TableCell>
      <TableCell className="text-right space-y-4">
        <Input
          type="text"
          name="beam"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'deflection')}
        />
        <Input
          type="text"
          name="slab"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'deflection')}
        />
      
      </TableCell>

      <TableCell className="space-y-4">
        <Input
          type="file"
          name="beam"
          onChange={(e) => onPhotoChange(e, 'deflection')}
        />
        <Input
          type="file"
          name="slab"
          onChange={(e) => onPhotoChange(e, 'deflection')}
        />
      
      </TableCell>
    </>
  );
}

export default DeflectionForm;
