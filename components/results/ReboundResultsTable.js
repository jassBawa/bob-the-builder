import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function ReboundResultsTable({ reboundData }) {
  const { unsafeGroundData, unsafeFirstFloorData, unsafeSecondFloorData } =
    useReboundHammerData(reboundData);
  return (
    <div className="border p-2 my-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mt-12">
          Rebound Hammer (IS 516 Part 5, Section - 4): 2020
        </h2>
      </div>
      <Table border="2" className="w-full">
        <TableHeader>
          <TableRow>
            <TableCell className="text-left">Location</TableCell>
            <TableCell className="text-left">Element</TableCell>
            <TableCell className="text-left">
              Assumed Grade Of Concrete
            </TableCell>
            <TableCell className="text-left">
              Average Compressive Strength Of Concrete (in MPa)
            </TableCell>
            <TableCell className="text-left">DCRatio</TableCell>
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
                <TableCell className="text-left">{data.grade}</TableCell>
                <TableCell className="text-left">
                  {data.rhTestResults}MPa
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
          {unsafeFirstFloorData?.map((data, index) => (
            <TableRow key={index}>
              <React.Fragment>
                <TableCell className="text-left">{data.location}</TableCell>
                <TableCell className="text-left">{data.element}</TableCell>
                <TableCell className="text-left">{data.grade}</TableCell>
                <TableCell className="text-left">
                  {data.rhTestResults}MPa
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
                  {data.rhTestResults}MPa
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

export default ReboundResultsTable;

const useReboundHammerData = (reboundHammer) => {
  const [unsafeGroundData, setUnsafeGroundData] = useState([]);
  const [unsafeFirstFloorData, setUnsafeFirstFloorData] = useState([]);
  const [unsafeSecondFloorData, setUnsafeSecondFloorData] = useState([]);
  const getUnsafeDataForFloor = (floor) => {
    if (!reboundHammer || !reboundHammer[floor]) return [];
    return reboundHammer[floor].filter((item) => item.remarks === 'unsafe');
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
