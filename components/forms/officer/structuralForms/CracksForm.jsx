import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import React from 'react';
import { SelectGrade } from '../../officer/StructuralObservations';
import useFormData from '@/hooks/useFormData';

function CracksForm() {
  const {
    structuralObservationsData,
    handleGradeChange,
    handleLocationChange,
    handlePhotoChange,
  } = useFormData();

  const {cracks} = structuralObservationsData;

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
      <TableCell className="font-medium border-r">Cracks</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-0 ">
        <p className="py-2 px-4  border-b-2">Beam</p>
        <p className="py-2 px-4 border-b-2">Slab</p>
        <p className="py-2 px-4 border-b-2">Column</p>
        <p className="py-2 px-4 border-b-2">Chajja</p>
        <p className="py-2 px-4 border-b-2">Plaster</p>
        <p className="py-2 px-4">Wall</p>
      </TableCell>
      <TableCell className="space-y-4">
        <SelectGrade
          value={cracks.beam.grade}
          onChange={(value) => handleGradeChange('cracks', 'beam', value)}
        />
        <SelectGrade
          value={cracks.slab.grade}
          onChange={(value) => handleGradeChange('cracks', 'slab', value)}
        />
        <SelectGrade
          value={cracks.column.grade}
          onChange={(value) => handleGradeChange('cracks', 'column', value)}
        />
        <SelectGrade
          value={cracks.chajja.grade}
          onChange={(value) => handleGradeChange('cracks', 'chajja', value)}
        />
        <SelectGrade
          value={cracks.plaster.grade}
          onChange={(value) => handleGradeChange('cracks', 'plaster', value)}
        />
        <SelectGrade
          value={cracks.wall.grade}
          onChange={(value) => handleGradeChange('cracks', 'wall', value)}
        />
      </TableCell>
      <TableCell className="text-right space-y-4">
        <Input
          type="text"
          name="beam"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'cracks')}
        />
        <Input
          type="text"
          name="slab"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'cracks')}
        />
        <Input
          type="text"
          name="column"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'cracks')}
        />
        <Input
          type="text"
          name="chajja"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'cracks')}
        />
        <Input
          type="text"
          name="plaster"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'cracks')}
        />
        <Input
          type="text"
          name="wall"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'cracks')}
        />
      </TableCell>

      <TableCell className="space-y-4">
        <Input
          type="file"
          name="beam"
          onChange={(e) => onPhotoChange(e, 'cracks')}
        />
        <Input
          type="file"
          name="slab"
          onChange={(e) => onPhotoChange(e, 'cracks')}
        />
        <Input
          type="file"
          name="column"
          onChange={(e) => onPhotoChange(e, 'cracks')}
        />
        <Input
          type="file"
          name="chajja"
          onChange={(e) => onPhotoChange(e, 'cracks')}
        />
        <Input
          type="file"
          name="plaster"
          onChange={(e) => onPhotoChange(e, 'cracks')}
        />
        <Input
          type="file"
          name="wall"
          onChange={(e) => onPhotoChange(e, 'cracks')}
        />
      </TableCell>
    </>
  );
}

export default CracksForm;
