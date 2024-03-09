import InputField from "@/components/ui/InputField";
import { Button } from "@/components/ui/button";
import React from "react";

function GettingStartedPage() {
  return (
    <div className="mt-8 mx-8 p-8 rounded bg-white">
      <h2 className="text-2xl font-semibold">General Information</h2>
      <p className="text-sm">List of officer’s accessed the portal</p>
      <div className="mt-12 grid gap-4 grid-cols-3">
        <InputField
          label={"Building Name"}
          name={"companyName"}
          placeholder={"Enter name here"}
          className={"col-span-2"}
        />
        <InputField
          label={"Office Number"}
          name={"officeNumber"}
          placeholder={"Enter Office Number"}
          className={""}
        />
        <InputField
          label={"Registred Office Address"}
          name={"officeAddress"}
          placeholder={"Enter office address"}
          className={"col-span-2"}
        />
        <InputField
          label={"Alternative office number"}
          name={"alternativeOfficeNumber"}
          placeholder={"91 XXXX XXXX"}
          className={""}
        />
        <InputField label={"City"} name="city" placeholder={"City"} />
        <InputField
          label={"Country"}
          name={"country"}
          className={""}
          placeholder={"Country"}
        />
        <InputField
          label={"Pincode"}
          name={"pincode"}
          className={""}
          placeholder={"Pincode"}
        />
      </div>
      <div className="mt-8 flex gap-4">
        <Button className="px-8">Next</Button>
      </div>
    </div>
  );
}

export default GettingStartedPage;
