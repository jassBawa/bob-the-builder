import React from 'react';
import PdfViewer from './dashboard/PdfViewer';

function BuildingView({ building }) {
  console.log(building);
  return (
    <div className="overflow-y-scroll h-96">
      <div className="mt-4 mx-8 p-8 rounded bg-white grid grid-cols-2 gap-8">
        <ViewItem label={'Building Use'} value={building?.buildingUse} />

        <ViewItem label={'Building Address'} value={building?.id} />
        <ViewItem
          label={'Building Address'}
          value={building?.registeredAddress}
        />
        <ViewItem label={'Story heights'} value={building?.storyHeights} />
        <ViewItem
          label={'Total build up area'}
          value={building?.totalBuiltUpArea}
        />

        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
            Structural Report File
          </p>

          <iframe
            src={building.structuralReportUrl}
            frameborder="0"
            className="w-full h-72"
          ></iframe>
          {/* <PdfViewer /> */}
        </div>
        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
            Geo Report File
          </p>

          <iframe
            src={building?.georeportUrl}
            frameborder="0"
            className="w-full h-72"
          ></iframe>
          {/* <PdfViewer /> */}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default BuildingView;

const ViewItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-2xl  text-slate-600 font-semibold">{label}</p>
      <p className="text-xl mt-4">{value}</p>
    </div>
  );
};
