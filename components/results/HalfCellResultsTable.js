import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function HalfCellResultsTable({ halfCellData }) {
  const { groundData, firstFloorData, secondFloorData } =
    useHalfCellTableData(halfCellData);
  //   console.log(halfCellData, groundData);
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
            {groundData.length > 0 && (
              <TableCell colspan={6} className="text-xl text-semibold">
                Ground Floor
              </TableCell>
            )}
          </TableRow>

          {groundData?.map((data, index) => (
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
            {firstFloorData.length > 0 && (
              <TableCell colspan={6} className="text-xl text-semibold">
                First Floor
              </TableCell>
            )}
          </TableRow>
          {firstFloorData?.map((data, index) => (
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
            {secondFloorData.length > 0 && (
              <TableCell colspan={6} className="text-xl text-semibold">
                Second Floor
              </TableCell>
            )}
          </TableRow>
          {secondFloorData?.map((data, index) => (
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
        </TableBody>
      </Table>
    </div>
  );
}

export default HalfCellResultsTable;

const useHalfCellTableData = (halfCellData) => {
  const [groundData, setGroundData] = useState([]);
  const [firstFloorData, setFirstFloorData] = useState([]);
  const [secondFloorData, setSecondFloorData] = useState([]);

  const getDataForFloor = (floor) => {
    if (!halfCellData || !halfCellData[floor]) return [];
    return halfCellData[floor].filter(
      (item) =>
        item.measurePotentital && parseFloat(item.measurePotentital) < 200
    );
  };

  useEffect(() => {
    if (halfCellData) {
      setGroundData(getDataForFloor('ground'));
      setFirstFloorData(getDataForFloor('first'));
      setSecondFloorData(getDataForFloor('second'));
    }
  }, [halfCellData]);

  return {
    groundData,
    firstFloorData,
    secondFloorData,
  };
};
