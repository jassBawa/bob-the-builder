import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import useFormData from '@/hooks/useFormData';
import { SelectGrade } from '../../officer/StructuralObservations';

function SettlementForm() {
  const {
    structuralObservationsData,
    handleGradeChange,
    handleLocationChange,
    handlePhotoChange,
  } = useFormData();

  const {settlement}= structuralObservationsData;

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
      <TableCell className="font-medium border-r">Settlement</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-0 ">
        <p className="py-2 px-4  border-b-2">Foundation</p>
        <p className="py-2 px-4 border-b-2">Joint at plinth</p>
        <p className="py-2 px-4 border-b-2">Column</p>
        <p className="py-2 px-4 border-b-2">Wall</p>
      </TableCell>
      <TableCell className="space-y-4">
        <SelectGrade
          value={settlement.foundation.grade}
          onChange={(value) =>
            handleGradeChange('settlement', 'foundation', value)
          }
        />
        <SelectGrade
          value={settlement['joint at plinth'].grade}
          onChange={(value) =>
            handleGradeChange('settlement', 'joint at plinth', value)
          }
        />
        <SelectGrade
          value={settlement.column.grade}
          onChange={(value) => handleGradeChange('settlement', 'column', value)}
        />
        <SelectGrade
          value={settlement.wall.grade}
          onChange={(value) => handleGradeChange('settlement', 'wall', value)}
        />
      </TableCell>
      <TableCell className="text-right space-y-4">
        <Input
          type="text"
          name="foundation"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'settlement')}
        />
        <Input
          type="text"
          name="joint at plinth"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'settlement')}
        />
        <Input
          type="text"
          name="column"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'settlement')}
        />
        <Input
          type="text"
          name="wall"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'settlement')}
        />
      </TableCell>

      <TableCell className="space-y-4">
        <Input
          type="file"
          name="foundation"
          onChange={(e) => onPhotoChange(e, 'settlement')}
        />
        <Input
          type="file"
          name="joint at plinth"
          onChange={(e) => onPhotoChange(e, 'settlement')}
        />
        <Input
          type="file"
          name="column"
          onChange={(e) => onPhotoChange(e, 'settlement')}
        />
        <Input
          type="file"
          name="wall"
          onChange={(e) => onPhotoChange(e, 'settlement')}
        />
      </TableCell>
    </>
  );
}

export default SettlementForm;
