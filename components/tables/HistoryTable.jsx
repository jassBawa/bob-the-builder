import React from "react";
import Badge from "@/components/ui/Badge";
import { DeleteIcon, EditIcon, InfoIIcon } from "@/components/ui/icons";

const DUMMYITEMS = [
  {
    id: 1,
    name: "Lorem Ipsum 1",
    date: "12/10/2023",
    status: true,
  },
  {
    id: 2,
    name: "Lorem Ipsum 2",
    date: "05/22/2023",
    status: false,
  },
  {
    id: 3,
    name: "Lorem Ipsum 3",
    date: "08/15/2023",
    status: true,
  },
  {
    id: 4,
    name: "Lorem Ipsum 3",
    date: "08/15/2023",
    status: true,
  },
  {
    id: 5,
    name: "Lorem Ipsum 3",
    date: "08/15/2023",
    status: true,
  },
  // Add more entries as needed
];

function HistoryTable() {
  return (
    <>
      <div className="mt-16 border min-h-60 rounded-lg divide-y 3bg-blue-200 ">
        <div className="grid grid-cols-4 ">
          <div className="p-3 ">Name</div>
          <div className="p-3 ">Last accessed</div>
          <div className="p-3 ">Status</div>
          <div className="p-3 ">Action</div>
        </div>
        {DUMMYITEMS.map((item) => {
          return (
            <div key={item.id} className="grid grid-cols-4 ">
              <div className=" p-4 ">{item.name}</div>
              <div className=" p-4 ">{item.date}</div>
              <div className=" p-4 ">
                <Badge status={item.status} />
              </div>
              <div className="p-4 flex items-center gap-8 ">
                <InfoIIcon className="cursor-pointer" />
                <EditIcon className="cursor-pointer" />
                <DeleteIcon className="cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="navigationbtns mt-4 flex gap-2 justify-end">
        <button className="py-2 px-3 border rounded-lg">Previous</button>
        <button className="py-2 px-3 border rounded-lg">Next</button>
      </div>
    </>
  );
}

export default HistoryTable;
