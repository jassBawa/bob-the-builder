import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import useFormData from '@/hooks/useFormData';
import { SelectGrade } from '../../officer/StructuralObservations';

function ConditionOfForm() {
  const {
    structuralObservationsData,
    handleGradeChange,
    handleLocationChange,
    handlePhotoChange,
  } = useFormData();

  const { conditionOf } = structuralObservationsData;

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
      <TableCell className="font-medium border-r">Condition Of</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-0 ">
        <p className="py-2 px-4  border-b-2">Stairs</p>
        <p className="py-2 px-4 border-b-2">Lifts/Shafts</p>
        <p className="py-2 px-4 border-b-2">floors</p>
        <p className="py-2 px-4 border-b-2">duct</p>
      </TableCell>
      <TableCell className="space-y-4">
        <SelectGrade
          value={conditionOf.stairs.grade}
          onChange={(value) =>
            handleGradeChange('conditionOf', 'stairs', value)
          }
        />
        <SelectGrade
          value={conditionOf['lifts/shafts'].grade}
          onChange={(value) =>
            handleGradeChange('conditionOf', 'lifts/shafts', value)
          }
        />
        <SelectGrade
          value={conditionOf.floors.grade}
          onChange={(value) =>
            handleGradeChange('conditionOf', 'floors', value)
          }
        />
        <SelectGrade
          value={conditionOf.duct.grade}
          onChange={(value) => handleGradeChange('conditionOf', 'duct', value)}
        />
      </TableCell>
      <TableCell className="text-right space-y-4">
        <Input
          type="text"
          name="stairs"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'conditionOf')}
        />
        <Input
          type="text"
          name="lifts/shafts"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'conditionOf')}
        />
        <Input
          type="text"
          name="floors"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'conditionOf')}
        />
        <Input
          type="text"
          name="duct"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'conditionOf')}
        />
      </TableCell>

      <TableCell className="space-y-4">
        <Input
          type="file"
          name="stairs"
          onChange={(e) => onPhotoChange(e, 'conditionOf')}
        />
        <Input
          type="file"
          name="lifts/shafts"
          onChange={(e) => onPhotoChange(e, 'conditionOf')}
        />
        <Input
          type="file"
          name="floors"
          onChange={(e) => onPhotoChange(e, 'conditionOf')}
        />
        <Input
          type="file"
          name="duct"
          onChange={(e) => onPhotoChange(e, 'conditionOf')}
        />
      </TableCell>
    </>
  );
}

export default ConditionOfForm;
