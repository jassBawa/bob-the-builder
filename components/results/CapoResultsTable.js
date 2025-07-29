import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

function CapoResultsTable({ capoData, generalObservationsData }) {
  const { groundData, firstFloorData, secondFloorData } = useCapoTableData(
    capoData,
    generalObservationsData
  );
  return (
    <div className="border p-2">
      <div className="my-2">
        <h2 className="text-xl font-semibold mt-8">
          Cut And Pullout Test (ASTM C900) - 06
        </h2>
      </div>
      <Table border="2" className="w-full">
        <TableHeader>
          <TableRow>
            <TableCell className="text-left">Location</TableCell>
            <TableCell className="text-left">Element</TableCell>
            <TableCell className="text-left">
              Average Compressive Strength Of Concrete
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
                  {data.cubeCompressiveStrength}
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
                  {data.cubeCompressiveStrength}
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
                  {data.cubeCompressiveStrength}
                </TableCell>
              </React.Fragment>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CapoResultsTable;

const useCapoTableData = (capoData, generalObservationsData) => {
  const [groundData, setGroundData] = useState([]);
  const [firstFloorData, setFirstFloorData] = useState([]);
  const [secondFloorData, setSecondFloorData] = useState([]);

  useEffect(() => {
    if (!capoData || !generalObservationsData?.grade) return;

    const getDataForFloor = (floor) => {
      if (!capoData || !capoData[floor]) return [];
      return capoData[floor].filter(
        (item) =>
          item.cubeCompressiveStrength &&
          parseFloat(item.cubeCompressiveStrength) <=
            parseFloat(generalObservationsData.grade)
      );
    };

    setGroundData(getDataForFloor('ground'));
    setFirstFloorData(getDataForFloor('first'));
    setSecondFloorData(getDataForFloor('second'));
  }, [capoData, generalObservationsData]);

  return {
    groundData,
    firstFloorData,
    secondFloorData,
  };
};
