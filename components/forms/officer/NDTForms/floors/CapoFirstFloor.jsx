import { useEffect } from 'react';

import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import { SelectElement } from './ReboundHammerGroundFloorForm';
import useNdtStore from '@/hooks/useNdtData';
import { SelectGrade } from './CapoGroundFloor';

function CapoFirstFloor() {
  const { ndtdata, updateField } = useNdtStore();
  const capoData = ndtdata.inSitu.capo;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField('inSitu', 'capo', 'first', index, 'location', newValue);
  };

  // Element
  const handleElementChange = (index, value) => {
    console.log(index, value);
    updateField('inSitu', 'capo', 'first', index, 'element', value);
  };

  // Grade
  const handleGradeChange = (index, value) => {
    updateField('inSitu', 'capo', 'first', index, 'grade', value);
  };

  // Grade Results
  const handleCubeChange = (index, value) => {
    updateField(
      'inSitu',
      'capo',
      'first',
      index,
      'cubeCompressiveStrength',
      value
    );

    const tempGrade = capoData['first'][index]['grade'];
    const numberMatch = tempGrade.match(/\d+/);
    const extractedNumber = numberMatch ? Number(numberMatch[0]) : null; // Handle case where no number is found
    const compressiveStrength = extractedNumber / value;
    const safetyStatus = compressiveStrength > 1.5 ? 'unsafe' : 'safe';

    console.log(compressiveStrength);
    updateField('inSitu', 'capo', 'first', index, 'DCStatus', safetyStatus);
  };

  useEffect(() => {
    console.log(capoData);
  }, [capoData]);

  return (
    <>
      <TableCell className="font-medium border-r">First</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {capoData['first'].map((ele, index) => (
          <Input
            key={index}
            type="text"
            name={`location-${index}`}
            value={ele.location}
            placeholder="Enter location here..."
            onChange={(val) => handleLocationChange(index, val)}
          />
        ))}
      </TableCell>
      <TableCell className="space-y-4">
        {capoData['first'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>
      <TableCell className="text-right space-y-4">
        {capoData['first'].map((el, index) => (
          <SelectGrade
            key={index}
            onChange={(value) => handleGradeChange(index, value)}
            value={el.grade}
          />
        ))}
      </TableCell>

      <TableCell className="space-y-4">
        {capoData['first'].map((el, index) => (
          <Input
            key={index}
            value={el.cubeCompressiveStrength}
            placeholder="Enter test result here..."
            onChange={(e) => handleCubeChange(index, e.target.value)}
          />
        ))}
      </TableCell>
    </>
  );
}

export default CapoFirstFloor;
