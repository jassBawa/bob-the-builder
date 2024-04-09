"use client";
import PdfViewer from "@/components/dashboard/PdfViewer";
import useBuilding from "@/hooks/useBuilding";
import useProfile from "@/hooks/useProfile";
import { useAuthStore } from "@/state/auth";

function Page({ params }) {
  const { buildingId } = params;
  const { building } = useBuilding(buildingId);
  console.log(building);

  //   const building = {};
  return (
    <>
      <div className="mt-16 mx-8 p-8 rounded bg-white">
        <h2 className="text-2xl font-semibold">
          Building Id, {building?._id}{" "}
        </h2>
        <p className="text-sm">Track and Manage your information</p>
      </div>
      <div className="mt-4 mx-8 p-8 rounded bg-white grid grid-cols-2">
        {/* <div className="max-w-sm overflow-hidden">{token}</div>
        <h1 className="text-4xl font-bold">{name}</h1> */}
        <div>
          <h2 className="text-2xl font-semibold">Building Name</h2>
          <p className="text-sm">{building?.name}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Building Use</h2>
          <p className="text-sm">{building?.building_use}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Building Address</h2>
          <p className="text-sm">{building?.registeredAddress}</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Strcutural Assessment</h2>
          <PdfViewer
            pdfBuffer={building?.photographs_outer_profile?.data?.data}
          />
        </div>
      </div>
    </>
  );
}

export default Page;
