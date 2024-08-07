import { useEffect, useMemo } from 'react';

import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import useNdtStore from '@/hooks/useNdtData';
import { SelectElement } from './ReboundHammerGroundFloorForm';

export const getRemarks = (grade, value) => {
  const numericValue = parseFloat(value); // Ensure the value is a number
  console.log('uppr', numericValue);

  if (isNaN(numericValue)) return '';

  if (numericValue < 200) return 'Low';
  if (numericValue >= 200 && numericValue <= 350) return 'Uncertain';

  if (numericValue > 350 && numericValue <= 500) return 'High';
  if (numericValue > 500) return 'Severe';

  return '';
};

function HalfCellGroundFloorForm() {
  const { ndtdata, updateField } = useNdtStore();
  const halfCellPotentialData = ndtdata.corrosion.halfCellPotential;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField(
      'corrosion',
      'halfCellPotential',
      'ground',
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
      'ground',
      index,
      'element',
      value
    );
  };

  // Spacing
  const handleResultChange = (index, value) => {
    updateField(
      'corrosion',
      'halfCellPotential',
      'ground',
      index,
      'spacing',
      value
    );
  };

  // Measure Potential
  const handleMeasureChange = (index, value) => {
    console.log(index, value);
    updateField(
      'corrosion',
      'halfCellPotential',
      'ground',
      index,
      'measurePotentital',
      value
    );
    const grade = halfCellPotentialData.ground[index].grade; // no need of this
    const remarks = getRemarks(grade, value);
    updateField(
      'corrosion',
      'halfCellPotential',
      'ground',
      index,
      'remarks',
      remarks
    );
  };

  useEffect(() => {
    console.log(halfCellPotentialData);
  }, [halfCellPotentialData]);

  return (
    <>
      <TableCell className="font-medium border-r">Ground</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {halfCellPotentialData['ground'].map((ele, index) => (
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
        {halfCellPotentialData['ground'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>

      {/* <TableCell className="space-y-4">
        {halfCellPotentialData['ground'].map((el, index) => (
          <Input
            key={index}
            value={el.spacing}
            placeholder="Enter spacing in mm..."
            onChange={(event) => handleResultChange(index, event.target.value)}
          />
        ))}
      </TableCell> */}
      <TableCell className="space-y-4">
        {halfCellPotentialData['ground'].map((el, index) => (
          <InputWithHelper
            key={index}
            name={`measurePotentital-${index + 1}`}
            placeholder="Enter measure potentital value"
            value={el.measurePotentital}
            grade={el.grade}
            onChange={(value) => handleMeasureChange(index, value)}
          />
        ))}
      </TableCell>
    </>
  );
}

export default HalfCellGroundFloorForm;

export const InputWithHelper = ({
  name,
  placeholder,
  value,
  grade,
  onChange,
}) => {
  const getHelperText = (grade, value) => {
    // console.log(grade, value);
    const numericValue = parseFloat(value); // Ensure the value is a number
    console.log(numericValue);

    if (isNaN(numericValue)) return '';

    // Extract the numeric part of the grade
    // const gradeNumericPart = parseInt(grade.slice(1));
    // console.log(gradeNumericPart);

    if (numericValue < 200) return 'Low';
    if (numericValue >= 200 && numericValue <= 350) return 'Uncertain';
    if (numericValue > 350 && numericValue <= 500) return 'High';
    if (numericValue > 500) return 'Severe';

    return '';
  };

  const helperText = useMemo(() => getHelperText(grade, value), [grade, value]);

  return (
    <div>
      <Input
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <p>{helperText}</p>
    </div>
  );
};
