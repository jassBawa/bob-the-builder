"use client"
import { useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { InputWithHelper, SelectProbingMethod } from '@/components/shared/Forms';
import { TableCell } from '@/components/ui/table';
import useNdtStore from '@/hooks/useNdtData';
import { SelectElement, SelectGrade } from './ReboundHammerGroundFloorForm';

const getMetricGrade = (grade, value) => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) return '';

  if (grade && parseInt(grade.slice(1)) < 25) {
    if (numericValue < 3.5) return 'Doubtful';
    if (numericValue >= 3.5 && numericValue <= 4.5) return 'Good';
    return 'Excellent';
  } else {
    if (numericValue < 3.75) return 'Doubtful';
    if (numericValue >= 3.75 && numericValue <= 4.5) return 'Good';
    return 'Excellent';
  }
};

function IntegrityUSPVGroundFloorForm() {
  const { ndtdata, updateField } = useNdtStore();
  const uspvData = ndtdata.inSitu.USPV;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'location', newValue);
  };

  // Element
  const handleElementChange = (index, value) => {
    console.log(index, value);
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'element', value);
  };

  // Grade
  const handleGradeChange = (index, value) => {
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'grade', value);
  };

  // Grade Results
  const handleGradeResultsChange = (index, event) => {
    const newValue = event.target.value;
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'rhTestResults', newValue);
  };

  // Probing
  const handleProbingMethodChange = (index, value) => {
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'probingMethod', value);
  };

  // uspv
  const handleUSPVChange = (index, value) => {
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'upvValues', value);
    const grade = uspvData.ground[index].grade;
    const metricGrade = getMetricGrade(grade, value);
    updateField('strucuturalIntegrity', 'USPV', 'ground', index, 'metricGrade', metricGrade);
  };

  useEffect(() => {
    console.log(ndtdata);
    console.log(uspvData);
  }, [uspvData, ndtdata]);

  return (
    <>
      <TableCell className="font-medium border-r">Ground</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {uspvData['ground'].map((ele, index) => (
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
        {uspvData['ground'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>
      <TableCell className="text-right space-y-4">
        {uspvData['ground'].map((el, index) => (
          <SelectGrade
            key={index}
            onChange={(value) => handleGradeChange(index, value)}
            value={el.grade}
          />
        ))}
      </TableCell>

      <TableCell className="space-y-4">
        {uspvData['ground'].map((el, index) => (
          <SelectProbingMethod
            key={index}
            onChange={(value) => handleProbingMethodChange(index, value)}
            value={el.grade}
          />
        ))}
      </TableCell>
      <TableCell className="space-y-4">
        {uspvData['ground'].map((el, index) => (
          <InputWithHelper
            key={index}
            name={`uspvValues-${index + 1}`}
            placeholder="Enter UPV value"
            value={el.upvValues}
            grade={el.grade}
            onChange={(value) => handleUSPVChange(index, value)}
          />
        ))}
      </TableCell>
    </>
  );
}

export default IntegrityUSPVGroundFloorForm;
