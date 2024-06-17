import { useEffect } from 'react';

import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import { SelectElement } from './ReboundHammerGroundFloorForm';
import useNdtStore from '@/hooks/useNdtData';

function CapoSecondFloor() {
  const { ndtdata, updateField } = useNdtStore();
  const capoData = ndtdata.inSitu.capo;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField('inSitu', 'capo', 'second', index, 'location', newValue);
  };

  // Element
  const handleElementChange = (index, value) => {
    console.log(index, value);
    updateField('inSitu', 'capo', 'second', index, 'element', value);
  };

  // Grade
  const handleFailureChange = (index, value) => {
    console.log(index, value);
    updateField('inSitu', 'capo', 'second', index, 'failureLoad', value);
  };

  // Grade Results
  const handleCubeChange = (index, value) => {
    updateField(
      'inSitu',
      'capo',
      'second',
      index,
      'cubeCompressiveStrength',
      value
    );
  };

  useEffect(() => {
    console.log(capoData);
  }, [capoData]);

  return (
    <>
      <TableCell className="font-medium border-r">Second</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {capoData['second'].map((ele, index) => (
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
        {capoData['second'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>
      <TableCell className="text-right space-y-4">
        {capoData['second'].map((el, index) => (
          <Input
            key={index}
            value={el.failureLoad}
            placeholder="Enter test result here..."
            onChange={(e) => handleFailureChange(index, e.target.value)}
          />
        ))}
      </TableCell>

      <TableCell className="space-y-4">
        {capoData['second'].map((el, index) => (
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

export default CapoSecondFloor;
