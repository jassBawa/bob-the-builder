import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import useFormData from '@/hooks/useFormData';
import { SelectGrade } from '../../officer/StructuralObservations';

function CorrosionForm() {
  const {
    structuralObservationsData,
    handleGradeChange,
    handleLocationChange,
    handlePhotoChange,
  } = useFormData();

  const {corrosion} = structuralObservationsData;

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
      <TableCell className="font-medium border-r">Corrosion / stains</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-0 ">
        <p className="py-2 px-4  border-b-2">Beam</p>
        <p className="py-2 px-4 border-b-2">Slab</p>
        <p className="py-2 px-4 border-b-2">Column</p>
        <p className="py-2 px-4 border-b-2">Chajja</p>
        <p className="py-2 px-4 border-b-2">Stairs</p>
        <p className="py-2 px-4 border-b-2">Wall</p>
      </TableCell>
      <TableCell className="space-y-4">
        <SelectGrade
          value={corrosion.beam.grade}
          onChange={(value) => handleGradeChange('corrosion', 'beam', value)}
        />
        <SelectGrade
          value={corrosion.slab.grade}
          onChange={(value) => handleGradeChange('corrosion', 'slab', value)}
        />
        <SelectGrade
          value={corrosion.column.grade}
          onChange={(value) => handleGradeChange('corrosion', 'column', value)}
        />
        <SelectGrade
          value={corrosion.chajja.grade}
          onChange={(value) => handleGradeChange('corrosion', 'chajja', value)}
        />
        <SelectGrade
          value={corrosion.stairs.grade}
          onChange={(value) => handleGradeChange('corrosion', 'stairs', value)}
        />
        <SelectGrade
          value={corrosion.wall.grade}
          onChange={(value) => handleGradeChange('corrosion', 'wall', value)}
        />
      </TableCell>
      <TableCell className="text-right space-y-4">
        <Input
          type="text"
          name="beam"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'corrosion')}
        />
        <Input
          type="text"
          name="slab"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'corrosion')}
        />
        <Input
          type="text"
          name="column"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'corrosion')}
        />
        <Input
          type="text"
          name="chajja"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'corrosion')}
        />
        <Input
          type="text"
          name="stairs"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'corrosion')}
        />
        <Input
          type="text"
          name="wall"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'corrosion')}
        />
      </TableCell>

      <TableCell className="space-y-4">
        <Input
          type="file"
          name="beam"
          onChange={(e) => onPhotoChange(e, 'corrosion')}
        />
        <Input
          type="file"
          name="slab"
          onChange={(e) => onPhotoChange(e, 'corrosion')}
        />
        <Input
          type="file"
          name="column"
          onChange={(e) => onPhotoChange(e, 'corrosion')}
        />
        <Input
          type="file"
          name="chajja"
          onChange={(e) => onPhotoChange(e, 'corrosion')}
        />
        <Input
          type="file"
          name="stairs"
          onChange={(e) => onPhotoChange(e, 'corrosion')}
        />
        <Input
          type="file"
          name="wall"
          onChange={(e) => onPhotoChange(e, 'corrosion')}
        />
      </TableCell>
    </>
  );
}

export default CorrosionForm;
