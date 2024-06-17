import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import useFormData from '@/hooks/useFormData';
import { SelectGrade } from '../officer/StructuralObservations';

function LeakageAndDampnessForm() {
  const {
    structuralObservationsData,
    handleGradeChange,
    handleLocationChange,
    handlePhotoChange,
  } = useFormData();

  const { leakageAndDampness } = structuralObservationsData;

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
      <TableCell className="font-medium border-r">
        Leakage and Dampness
      </TableCell>
      <TableCell className="font-medium border-r space-y-4 p-0 ">
        <p className="py-2 px-4  border-b-2">External Walls</p>
        <p className="py-2 px-4 border-b-2">Internal Walls</p>
        <p className="py-2 px-4 border-b-2">Toilet</p>
        <p className="py-2 px-4 border-b-2">Terrace</p>
        <p className="py-2 px-4 border-b-2">Slab</p>
        <p className="py-2 px-4 border-b-2">Water Tank</p>
        <p className="py-2 px-4 border-b-2">Drainage line/ Pumping line</p>
      </TableCell>
      <TableCell className="space-y-4">
        <SelectGrade
          value={leakageAndDampness['external walls'].grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'external walls', value)
          }
        />
        <SelectGrade
          value={leakageAndDampness['internal walls'].grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'internal walls', value)
          }
        />
        <SelectGrade
          value={leakageAndDampness.toilet.grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'toilet', value)
          }
        />
        <SelectGrade
          value={leakageAndDampness.terrace.grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'terrace', value)
          }
        />
        <SelectGrade
          value={leakageAndDampness.slab.grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'slab', value)
          }
        />
        <SelectGrade
          value={leakageAndDampness['water tank'].grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'water tank', value)
          }
        />
        <SelectGrade
          value={leakageAndDampness['drainage line'].grade}
          onChange={(value) =>
            handleGradeChange('leakageAndDampness', 'drainage line', value)
          }
        />
      </TableCell>
      <TableCell className="text-right space-y-4">
        <Input
          type="text"
          name="external walls"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
        <Input
          type="text"
          name="internal walls"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
        <Input
          type="text"
          name="toilet"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
        <Input
          type="text"
          name="terrace"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
        <Input
          type="text"
          name="slab"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
        <Input
          type="text"
          name="water tank"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
        <Input
          type="text"
          name="drainage line"
          placeholder="Enter location"
          onChange={(e) => onLocationChange(e, 'leakageAndDampness')}
        />
      </TableCell>

      <TableCell className="space-y-4">
        <Input
          type="file"
          name="external walls"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
        <Input
          type="file"
          name="internal walls"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
        <Input
          type="file"
          name="toilet"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
        <Input
          type="file"
          name="terrace"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
        <Input
          type="file"
          name="slab"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
        <Input
          type="file"
          name="water tank"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
        <Input
          type="file"
          name="drainage line"
          onChange={(e) => onPhotoChange(e, 'leakageAndDampness')}
        />
      </TableCell>
    </>
  );
}

export default LeakageAndDampnessForm;
