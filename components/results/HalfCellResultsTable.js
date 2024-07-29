import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function HalfCellResultsTable({ halfCellData }) {
  const { unsafeGroundData, unsafeFirstFloorData, unsafeSecondFloorData } =
    useCapoData(halfCellData);
  //   console.log(halfCellData, unsafeGroundData);
  return (
    <div className="border p-2 my-4">
      <div className="my-2">
        <h2 className="text-xl font-semibold mt-12">
          Half Cell (IS 516 Part 5, Section 1) - 2018
        </h2>
        <p className="text-red-400">
          All measured potential values are negative.
        </p>
      </div>
      <Table border="2" className="w-full">
        <TableHeader>
          <TableRow>
            <TableCell className="text-left">Location</TableCell>
            <TableCell className="text-left">Element</TableCell>
            <TableCell className="text-left">Measure Potential (mV)</TableCell>
            <TableCell className="text-left">Remarks</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-slate-200 row-span-full">
            {unsafeGroundData.length > 0 && (
              <TableCell colspan={6} className="text-xl text-semibold">
                Ground Floor
              </TableCell>
            )}
          </TableRow>

          {unsafeGroundData?.map((data, index) => (
            <TableRow key={index}>
              <React.Fragment>
                <TableCell className="text-left">{data.location}</TableCell>
                <TableCell className="text-left">{data.element}</TableCell>
                <TableCell className="text-left">
                  -{data.measurePotentital}
                </TableCell>
                <TableCell className="text-left">{data.remarks}</TableCell>
              </React.Fragment>
            </TableRow>
          ))}
          <TableRow className="bg-slate-200">
            {unsafeFirstFloorData.length > 0 && (
              <TableCell colspan={6} className="text-xl text-semibold">
                First Floor
              </TableCell>
            )}
          </TableRow>
          {unsafeSecondFloorData?.map((data, index) => (
            <TableRow key={index}>
              <React.Fragment>
                <TableCell className="text-left">{data.location}</TableCell>
                <TableCell className="text-left">{data.element}</TableCell>
                <TableCell className="text-left">{data.grade}</TableCell>
                <TableCell className="text-left">
                  {data.probingMethod}
                </TableCell>
                <TableCell className="text-left">
                  -{data.upvValues}(km/s)
                </TableCell>
                <TableCell className="text-left">{data.remarks}</TableCell>
              </React.Fragment>
            </TableRow>
          ))}
          <TableRow className="bg-slate-200">
            {unsafeSecondFloorData.length > 0 && (
              <TableCell colspan={6} className="text-xl text-semibold">
                Second Floor
              </TableCell>
            )}
          </TableRow>
          {unsafeSecondFloorData?.map((data, index) => (
            <TableRow key={index}>
              <React.Fragment>
                <TableCell className="text-left">{data.location}</TableCell>
                <TableCell className="text-left">{data.element}</TableCell>
                <TableCell className="text-left">{data.grade}</TableCell>
                <TableCell className="text-left">
                  {data.probingMethod}
                </TableCell>
                <TableCell className="text-left">
                  -{data.measurePotentital}(km/s)
                </TableCell>
                <TableCell className="text-left">{data.remarks}</TableCell>
              </React.Fragment>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HalfCellResultsTable;

const useCapoData = (reboundHammer) => {
  const [unsafeGroundData, setUnsafeGroundData] = useState([]);
  const [unsafeFirstFloorData, setUnsafeFirstFloorData] = useState([]);
  const [unsafeSecondFloorData, setUnsafeSecondFloorData] = useState([]);

  const getUnsafeDataForFloor = (floor) => {
    if (!reboundHammer || !reboundHammer[floor]) return [];
    return reboundHammer[floor].filter((item) => item.remarks == 'Severe');
  };

  useEffect(() => {
    setUnsafeGroundData(getUnsafeDataForFloor('ground'));
    setUnsafeFirstFloorData(getUnsafeDataForFloor('first'));
    setUnsafeSecondFloorData(getUnsafeDataForFloor('second'));
  }, [reboundHammer]);

  return {
    unsafeGroundData,
    unsafeFirstFloorData,
    unsafeSecondFloorData,
  };
};
