'use client';
import useCurrentUser from '@/hooks/useCurrentUser';

import { db } from '@/firebase';
import { fetchBuildingData } from '@/lib/buildingSubcollection';
import { useEffect, useState } from 'react';
import { DialogDemo } from '../modals/DialogDemo';

function BuildingList() {
  const currentUser = useCurrentUser();
  const [buildings, setBuildings] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useState();

  useEffect(() => {
    if (db)
      fetchBuildingData(db, currentUser?.uid).then((buildingList) => {
        console.log(buildingList);
        setBuildings(buildingList);
      });
  }, [currentUser?.uid, db]);

  const showBuilding = (building) => {
    setCurrentBuilding(building);
    setIsOpen(true);
  };

  return (
    <div className="mt-4">
      <div className="space-y-2 max-w-md">
        {buildings.length === 0 ? (
          <h3 className="text-xl font-semibold">No buildings added yet</h3>
        ) : (
          <p className="">Name of the buildings</p>
        )}
        {buildings?.map((building) => {
          return (
            <div
              key={building?.id}
              onClick={() => showBuilding(building)}
              className="flex justify-between bg-slate-100 px-4 py-2 shadow-sm"
            >
              <p>{building.buildingName}</p>
              <p>{building.yearOfConstruction}</p>
            </div>
          );
        })}
        <DialogDemo
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          buildingData={currentBuilding}
        />
      </div>
    </div>
  );
}

export default BuildingList;
