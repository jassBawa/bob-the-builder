import React from 'react';

function BuildingView({ building }) {
  console.log(building);
  return (
    <div className="overflow-y-scroll h-96">
      <div className="mt-4 mx-8 p-8 rounded bg-white grid grid-cols-2 gap-8">
        <ViewItem label={'Building ID'} value={building?.id} />
        <ViewItem label={'Building Use'} value={building?.buildingUse} />

        <ViewItem label={'Building Name'} value={building?.buildingName} />
        <ViewItem
          label={'Building Structural system'}
          value={building?.buildingStructuralSystem}
        />
        <ViewItem label={'Foundation type'} value={building?.foundationType} />
        <ViewItem
          label={'Ground Coverage Area'}
          value={building?.groundCoverageArea}
        />
        <ViewItem label={'Number of stories'} value={building?.noOfStories} />
        <ViewItem label={'Story heights'} value={building?.storyHeights} />
        <ViewItem
          label={'Other information'}
          value={building?.otherInformation}
        />
        <ViewItem
          label={'Total build up area'}
          value={building?.totalBuiltUpArea}
        />
        <ViewItem
          label={'Dampness Cracks'}
          value={`${building?.dampnessCracks}`}
        />

        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
            Structural Report File
          </p>

          <iframe
           src={`${building.structuralReportUrl}#toolbar=0`}
            // src={}
            frameborder="0"
            className="w-full h-96"
          ></iframe>
          {/* <PdfViewer /> */}
        </div>
        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
            Geo Report File
          </p>

          <iframe
          
            src={`${building?.georeportUrl}#toolbar=0`}
            frameborder="0"
            className="w-full h-96"
          ></iframe>
          {/* <PdfViewer /> */}
        </div>
        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
          Architectural Drawings
          </p>

          <iframe
          
            src={`${building?.architecturalUrl}#toolbar=0`}
            frameborder="0"
            className="w-full h-96"
          ></iframe>

        </div>
        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
          Structural Design Calucation
          </p>

          <iframe
          
            src={`${building?.structuralCalculationUrl}#toolbar=0`}
            frameborder="0"
            className="w-full h-96"
          ></iframe>

        </div>
        <div className="col-span-2">
          <p className="text-2xl  text-slate-600 font-semibold">
          Structural Design Calucation
          </p>

          <img
          
            src={`${building?.buildingImage}`}
            frameborder="0"
            className="w-full h-96 object-contain"
          ></img>

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
