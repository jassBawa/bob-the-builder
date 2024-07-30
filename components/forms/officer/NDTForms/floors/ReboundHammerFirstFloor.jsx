import { Input } from '@/components/ui/Input';
import { TableCell } from '@/components/ui/table';
import useNdtStore from '@/hooks/useNdtData';
import { useEffect } from 'react';
import { SelectElement, SelectGrade } from './ReboundHammerGroundFloorForm';
import useBuildingData from '@/hooks/useBuildingData';

function ReboundHammerFirstFloorForm() {
  const { generalObservationsData } = useBuildingData();
  const { ndtdata, updateField } = useNdtStore();
  const reboundHammerData = ndtdata.inSitu.reboundHammer;

  const handleLocationChange = (index, e) => {
    const newValue = e.target.value;
    updateField(
      'inSitu',
      'reboundHammer',
      'first',
      index,
      'location',
      newValue
    );
  };

  // Element
  const handleElementChange = (index, value) => {
    console.log(index, value);
    updateField('inSitu', 'reboundHammer', 'first', index, 'element', value);
  };

  // Grade
  // const handleGradeChange = (index, value) => {
  //   updateField('inSitu', 'reboundHammer', 'first', index, 'grade', value);
  // };

  // Grade Results
  const handleGradeResultsChange = (index, event) => {
    const newValue = event.target.value;
    updateField(
      'inSitu',
      'reboundHammer',
      'first',
      index,
      'rhTestResults',
      newValue
    );

    const originalGrade = generalObservationsData.grade;
    const originalGradeNum = originalGrade.match(/\d+/)[0]; // m20
    const safetyStatus = originalGradeNum >= newValue ? 'unsafe' : 'safe';
    console.log(originalGradeNum, safetyStatus);

    updateField(
      'inSitu',
      'reboundHammer',
      'first',
      index,
      'remarks',
      safetyStatus
    );
  };

  useEffect(() => {
    console.log(ndtdata);
    console.log(reboundHammerData);
  }, [reboundHammerData, ndtdata]);

  return (
    <>
      <TableCell className="font-medium border-r">first</TableCell>
      <TableCell className="font-medium border-r space-y-4 p-2 ">
        {reboundHammerData['first'].map((ele, index) => (
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
        {reboundHammerData['first'].map((el, index) => (
          <SelectElement
            key={index}
            value={el.element}
            onChange={(value) => handleElementChange(index, value)}
          />
        ))}
      </TableCell>

      <TableCell className="space-y-4">
        {reboundHammerData['first'].map((el, index) => (
          <Input
            key={index}
            value={el.rhTestResults}
            placeholder="Enter test result here..."
            onChange={(event) => handleGradeResultsChange(index, event)}
          />
        ))}
      </TableCell>
    </>
  );
}

export default ReboundHammerFirstFloorForm;
