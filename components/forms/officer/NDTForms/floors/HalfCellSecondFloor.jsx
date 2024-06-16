import { useEffect } from 'react';

import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import { SelectElement, SelectGrade } from './ReboundHammerGroundFloorForm';
import useNdtStore from '@/hooks/useNdtData';

function HalfCellSecondFloorForm() {
  const { ndtdata, updateField } = useNdtStore();
  const halfCellPotentialData = ndtdata.corrosion.halfCellPotential;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField(
      'corrosion',
      'halfCellPotential',
      'second',
      index,
      'location',
      newValue
    );
  };

  // Element
  const handleElementChange = (index, value) => {

    console.log(index, value);
    updateField(
      'corrosion',
      'halfCellPotential',
      'second',
      index,
      'element',
      value
    );
  };

  // Grade
  const handleGradeChange = (index, value) => {
    updateField('corrosion', 'halfCellPotential', 'second', index, 'grade', value);
  };

  // Spacing
  const handleResultChange = (index, value) => {
    updateField(
      'corrosion',
      'halfCellPotential',
      'second',
      index,
      'spacing',
      value
    );
  };

  // Measure Potential
  const handleMeasureChange = (index, value) => {
    updateField(
      'corrosion',
      'halfCellPotential',
      'second',
      index,
      'measurePotentital',
      value
    );
  };

  useEffect(() => {
    console.log(halfCellPotentialData);
  }, [halfCellPotentialData]);

  return (
    <>
      <TableCell className="font-medium border-r">Second</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {halfCellPotentialData['second'].map((ele, index) => (
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
        {halfCellPotentialData['second'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>

      <TableCell className="space-y-4">
        {halfCellPotentialData['second'].map((el, index) => (
          <SelectGrade
            key={index}
            onChange={(value) => handleGradeChange(index, value)}
            value={el.grade}
          />
        ))}
      </TableCell>
      <TableCell className="space-y-4">
        {halfCellPotentialData['second'].map((el, index) => (
          <Input
            key={index}
            value={el.spacing}
            placeholder="Enter spacing in mm..."
            onChange={(event) => handleResultChange(index, event.target.value)}
          />
        ))}
      </TableCell>
      <TableCell className="space-y-4">
        {halfCellPotentialData['second'].map((el, index) => (
          <Input
            key={index}
            value={el.measurePotentital}
            placeholder="Enter measure potential"
            onChange={(event) => handleMeasureChange(index, event.target.value)}
          />
        ))}
      </TableCell>
    </>
  );
}

export default HalfCellSecondFloorForm;