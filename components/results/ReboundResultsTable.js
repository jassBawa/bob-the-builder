import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGeneralObservations from '@/hooks/useGeneralObservations';

function ReboundResultsTable({ reboundData, generalObservationsData }) {
  const { groundData, firstFloorData, secondFloorData } =
    useReboundHammerTableData(reboundData, generalObservationsData);
  console.log(reboundData);
  // console.log(generalObservationsData);
  console.log(groundData, firstFloorData, secondFloorData);

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
              Average Compressive Strength Of Concrete (in MPa)
            </TableCell>
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
                  {data.rhTestResults}MPa
                </TableCell>
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
                  {data.rhTestResults}MPa
                </TableCell>
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
                  {data.rhTestResults}MPa
                </TableCell>
              </React.Fragment>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ReboundResultsTable;

const useReboundHammerTableData = (reboundHammer, generalObservationsData) => {
  const [groundData, setGroundData] = useState([]);
  const [firstFloorData, setFirstFloorData] = useState([]);
  const [secondFloorData, setSecondFloorData] = useState([]);

  useEffect(() => {
    if (!reboundHammer || !generalObservationsData?.grade) return;

    const getDataForFloor = (floor) => {
      if (!reboundHammer || !reboundHammer[floor]) return [];
      return reboundHammer[floor].filter(
        (item) =>
          item.rhTestResults &&
          parseFloat(item.rhTestResults) <=
            parseFloat(generalObservationsData.grade)
      );
    };

    setGroundData(getDataForFloor('ground'));
    setFirstFloorData(getDataForFloor('first'));
    setSecondFloorData(getDataForFloor('second'));
  }, [reboundHammer, generalObservationsData]);

  return {
    groundData,
    firstFloorData,
    secondFloorData,
  };
};
