import { useEffect } from 'react';

import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import { SelectElement } from './ReboundHammerGroundFloorForm';
import useNdtStore from '@/hooks/useNdtData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function CapoGroundFloor() {
  const { ndtdata, updateField } = useNdtStore();
  const capoData = ndtdata.inSitu.capo;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField('inSitu', 'capo', 'ground', index, 'location', newValue);
  };

  // Element
  const handleElementChange = (index, value) => {
    console.log(index, value);
    updateField('inSitu', 'capo', 'ground', index, 'element', value);
  };

  // Grade
  const handleGradeChange = (index, value) => {
    updateField('inSitu', 'capo', 'ground', index, 'grade', value);
  };

  // Grade Results
  const handleCubeChange = (index, value) => {
    updateField(
      'inSitu',
      'capo',
      'ground',
      index,
      'cubeCompressiveStrength',
      value
    );

    const tempGrade = capoData['ground'][index]['grade'];
    const numberMatch = tempGrade.match(/\d+/);
    const extractedNumber = numberMatch ? Number(numberMatch[0]) : null; // Handle case where no number is found
    const compressiveStrength = extractedNumber / value;
    const safetyStatus = compressiveStrength > 1.5 ? 'unsafe' : 'safe';

    console.log(compressiveStrength);
    updateField('inSitu', 'capo', 'ground', index, 'DCStatus', safetyStatus);
  };

  useEffect(() => {
    console.log(capoData);
  }, [capoData]);

  return (
    <>
      <TableCell className="font-medium border-r">Ground</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {capoData['ground'].map((ele, index) => (
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
        {capoData['ground'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>
      <TableCell className="text-right space-y-4">
        {capoData['ground'].map((el, index) => (
          <SelectGrade
            key={index}
            onChange={(value) => handleGradeChange(index, value)}
            value={el.grade}
          />
        ))}
      </TableCell>

      <TableCell className="space-y-4">
        {capoData['ground'].map((el, index) => (
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

export default CapoGroundFloor;

export const SelectGrade = ({ onChange, value }) => {
  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select Grade" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={'M10'}>M10</SelectItem>
        <SelectItem value={'M15'}>M15</SelectItem>
        <SelectItem value={'M20'}>M20</SelectItem>
        <SelectItem value={'M25'}>M25</SelectItem>
        <SelectItem value={'M30'}>M30</SelectItem>
        <SelectItem value={'M35'}>M35</SelectItem>
        <SelectItem value={'M40'}>M40</SelectItem>
        <SelectItem value={'M45'}>M45</SelectItem>
        <SelectItem value={'M50'}>M50</SelectItem>
        <SelectItem value={'M55'}>M55</SelectItem>
        <SelectItem value={'M60'}>M60</SelectItem>
      </SelectContent>
    </Select>
  );
};
