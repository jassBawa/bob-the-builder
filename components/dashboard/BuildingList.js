import useBuildings from '@/hooks/useBuildings';
import Link from 'next/link';
import React from 'react';

function BuildingList() {
  // const { buildings, isLoading } = useBuildings();

  return (
    <div className="mt-4">
      <p className="">Name of the buildings</p>
      {false ? (
        <div>loading</div>
      ) : (
        <ul className="building__container mt-4 rounded-lg max-w-xl w-full border">
          {[0].map((building, index) => (
            <div
              key={index}
              className="flex gap-8 items-center border-b py-2 px-4"
            >
              <Link
                target="_blank"
                href={`/building/${building.id}`}
                // className="mr-8"
              >
                {building.id}
              </Link>
              {/* <span className="ml-auto flex gap-4"> */}
              <span>{building.country}</span>
              <span>{building.Building_use}</span>
              <span>{building.city}</span>
              {/* <Edit2Icon className="opacity-40 w-5 h-5" /> */}
              {/* <Trash2 className="opacity-40 w-5 h-5" /> */}
              {/* </span> */}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuildingList;
